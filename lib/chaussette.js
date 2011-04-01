var http = require('http'),
	io = require('socket.io'),
	url = require('url'),
	crypto = require('crypto');

var Chaussette = function(webHook, sharedSecret) {
	
};

exports.Chaussette = Chaussette;

Chaussette.prototype.listen = function(server) {
	this.ws = io.listen(server);
	this.ws.on('connection', function(client){
		//client.broadcast({ announcement: client.sessionId + ' connected' });
		// new client is here! 
		client.on('message', function(){

		});
		client.on('disconnect', function(){

		});
	});
};