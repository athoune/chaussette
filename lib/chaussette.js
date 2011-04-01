var connect = require('connect'),
	io = require('socket.io'),
	sys = require('sys'),
	url = require('url'),
	crypto = require('crypto');

var createChaussette = function(webHook, sharedSecret) {
	var chaussette = this;
	this.users = {};
	var server = connect.createServer(
		connect.logger(),
		connect.favicon(),
		connect.static(__dirname),
		connect.router(function(app){
			app.post('/api/user/:id/talk', function(req, res, next){
				// populates req.params.id
				console.log(req.params.id);
				var buffer = '';
				req.on('data', function(data) {
					buffer += data;
				});
				req.on('end', function() {
					console.log(buffer);
					res.end();
				});
			});
			app.get('/api/users', function(req, res, next){
				res.writeHead(200, {'Content-Type': 'text/plain'}); 
				var users = [];
				for(user in chaussette.users){
					users.push(user);
				}
				res.write(JSON.stringify(users));
				res.end();
			});
		})
	);
	var ws = io.listen(server);
	ws.on('connection', function(client){
		console.log(client.sessionId);
		this.user = null;
		//client.broadcast({ announcement: client.sessionId + ' connected' });
		// new client is here! 
		client.on('message', function(data){
			if(this.user == null) {
				this.user = data;
				chaussette.users[this.user] = this;
			}
		});
		client.on('disconnect', function(){
			delete chaussette[this.user];
		});
	});
	return server;
};

exports.createChaussette = createChaussette;

