Using JavaScript/HTML5 Rich Clients with Java EE 7
==================================================
This project demonstrates how you can utilize today's most popular JavaScript frameworks like Angular, 
Backbone, Knockout and Ember to utilize the core strengths of Java EE.

It is a Java EE 7 server-side application with an AngularJS front-end consisting of a chat application (powered by 
WebSocket) and a to-do list application (powered by REST). The server-side is implemented using 
the Java API for WebSocket, JSON-P, JAX-RS 2, CDI, Bean Validation, EJB 3 and JPA.

The application is secured. Before running the application, you must setup the right GlassFish security 
realm using the instructions below. You can also set the username/passwords 
via the database scripts in the source code. The passwords are stored as SHA-256
hashes. The current users are reza, nicole and zehra. The passwords are set to secret1. When using the 
application, the browser will warn you about the self-signed SSL certificate that GlassFish uses by default. 
Simply ignore the warning, it's harmless.

The project is in standard Maven format. You should be able to open it using any IDE that supports Maven and 
run it using any Java EE 7 container. However, we used NetBeans and GlassFish 4. Note that the project uses 
the default Derby database that comes with GlassFish. 

Setup Instructions
------------------
Here are the instructions to get up and running using NetBeans and GlassFish:

* Install JDK 7
* Install GlassFish 4+
* Install the NetBeans 7.4+ Java EE version (GlassFish 4.1+ will only work with NetBeans 8.0.1+)
* Setup GlassFish in NetBeans (make sure Derby is started with GlassFish)
* Make sure you have GlassFish up and running.
* Execute the following asadmin command to remove any conflicting authentication 
  realms you might have. A conflict is unlikely, so the command will probably
  fail, which is fine. 
```
asadmin delete-auth-realm javascript-realm
```
* For GlassFish versions up to GlassFish 4.1 (but not including it) execute the
  following asadmin command to create the authentication realm we need:
```
asadmin create-auth-realm --classname com.sun.enterprise.security.ee.auth.realm.jdbc.JDBCRealm --property jaas-context=jdbcRealm:datasource-jndi=jdbc/__default:user-table=javascript_users:user-name-column=username:password-column=password:group-table=javascript_groups:group-name-column=group_name javascript-realm
```
* For GlassFish 4.1 and above execute the following asadmin command:
```
asadmin create-auth-realm --classname com.sun.enterprise.security.auth.realm.jdbc.JDBCRealm --property jaas-context=jdbcRealm:datasource-jndi=jdbc/__default:user-table=javascript_users:user-name-column=username:password-column=password:group-table=javascript_groups:group-name-column=group_name javascript-realm
```
* Open and build the project
* Run the project on GlassFish 4
* Open up a browser and go to [http://localhost:8080/javaee-javascript](http://localhost:8080/javaee-javascript)