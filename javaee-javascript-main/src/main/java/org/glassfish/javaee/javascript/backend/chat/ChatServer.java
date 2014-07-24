/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2013 Oracle and/or its affiliates. All rights reserved.
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License("CDDL") (collectively, the "License").  You
 * may not use this file except in compliance with the License.  You can
 * obtain a copy of the License at
 * http://glassfish.java.net/public/CDDL+GPL_1_1.html
 * or packager/legal/LICENSE.txt.  See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at packager/legal/LICENSE.txt.
 *
 * GPL Classpath Exception:
 * Oracle designates this particular file as subject to the "Classpath"
 * exception as provided by Oracle in the GPL Version 2 section of the License
 * file that accompanied this code.
 *
 * Modifications:
 * If applicable, add the following below the License Header, with the fields
 * enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyright [year] [name of copyright owner]"
 *
 * Contributor(s):
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright
 * holder.
 */
package org.glassfish.javaee.javascript.backend.chat;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Singleton;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/chat",
        encoders = {ChatMessage.class}, decoders = {ChatMessage.class})
@Singleton
public class ChatServer {

    private static final Logger logger = Logger
            .getLogger(ChatServer.class.getName());

    private final Set<Session> peers;

    public ChatServer() {
        peers = new HashSet<>();
    }

    @OnOpen
    public void onOpen(Session peer) {
        logger.log(Level.INFO, "Opened session: {0}", peer);
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        logger.log(Level.INFO, "Closed session: {0}", peer);
        peers.remove(peer);
    }

    @OnMessage
    public void onMessage(@Valid ChatMessage message, Session session) {
        logger.log(Level.INFO, "Received message {0} from peer {1}",
                new Object[]{message, session});

        for (Session peer : peers) {
            try {
                logger.log(Level.INFO, "Broadcasting message {0} to peer {1}",
                        new Object[]{message, peer});

                peer.getBasicRemote().sendObject(message);
            } catch (IOException | EncodeException ex) {
                logger.log(Level.SEVERE, "Error sending message", ex);
            }
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        try {
            if (error.getCause() instanceof ConstraintViolationException) {
                // Just report the first validation problem.
                JsonObject jsonObject = Json.createObjectBuilder()
                        .add("error",
                                ((ConstraintViolationException) error.getCause())
                                .getConstraintViolations().iterator().next()
                                .getMessage())
                        .build();
                session.getBasicRemote().sendText(jsonObject.toString());
            } else {
                logger.log(Level.SEVERE, null, error);
            }
        } catch (IOException ex) {
            logger.log(Level.SEVERE, null, ex);
        }
    }
}
