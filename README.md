Chaussette
==========

Socket.io as a service. You can use it with REST API and callback.
The missing link between PHP or any classical language and the modern async world :
you can push data to connected user.

This project use node, but you don't have to care about it, just like Solr.

Test
----

	cd test
	node server.js

Open http://localhost:8000.

In an another terminal :

	curl http://localhost:8000/api/users
	curl --data "beuha aussi" http://localhost:8000/api/user/mathieu/talk