Chaussette
==========

Socket.io as a service. You can use it with REST API and callback.
The missing link between PHP or any classical language and the modern async world :
you can push data to connected user.

This project use node, but you don't have to care about it, just like Solr.

Status
------

Early alpha, but you can see something.

 * √ REST list connectd users
 * √ REST -> web client communication
 * √ web client send event -> webhook
 * _ Minimal PHP api
 * _ Secured authentification on the socket
 * _ One users, lots of tabs
 * _ Proxy stuff to share one server port

Test
----

	cd test/node
	node server.js

Copy or symlink test.php in your server. Modify server.js webhook url

Open http://localhost:8000.

In an another terminal :

	curl http://localhost:8000/api/users
	curl --data "beuha aussi" http://localhost:8000/api/user/mathieu/talk

In the web page, you can send event to your webhook.