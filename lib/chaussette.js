var connect = require('connect'),
	io = require('socket.io'),
	sys = require('sys'),
	url = require('url'),
	querystring = require('querystring'),
	http = require('http'),
	crypto = require('crypto');

var WebHook = function(path) {
	this.urlparsed = url.parse(path);
};

WebHook.prototype.trigger = function(user, message, cb) {
	var body = querystring.stringify({user: user, message: message});
	var req = http.request({
			host: this.urlparsed.hostname,
			port: this.urlparsed.port,
			path: this.urlparsed.pathname,
			method: 'POST',
			headers: {
				'Connection': 'keep-alive',
				'Content-type': 'application/x-www-form-urlencoded', 
				'Content-length': body.length
			}
		}, function(res) {
			console.log('STATUS: ' + res.statusCode);
			if(cb != undefined) {
				cb.call(res);
			}
			// res.on('data', function (chunk) {
			// 	console.log('chunk: ', chunk.toString());
			// });
		});
	req.write(body);
	req.end();
};

var createChaussette = function(webPath, sharedSecret) {
	this.webHook = new WebHook(webPath);
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
					chaussette.users[req.params.id].send(buffer);
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
			} else {
				chaussette.webHook.trigger(this.user, data, function(res) {
					
				});
			}
		});
		client.on('disconnect', function(){
			delete chaussette[this.user];
		});
	});
	return server;
};

exports.createChaussette = createChaussette;

