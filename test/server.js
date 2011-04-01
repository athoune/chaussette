var Chaussette = require('../lib/chaussette').Chaussette,
	url = require('url'),
	fs = require('fs'),
	http = require('http');
	
var server = http.createServer(function(req, res){ 
	var path = url.parse(req.url).pathname;
	console.log(path);
	switch (path) {
	case '/':
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		res.write(fs.readFileSync('index.html')); 
		res.end(); 
	break;

}
 // your normal server code 
});

var chaussette = new Chaussette('http://localhost:8888/','casimir');
chaussette.listen(server);

server.listen(8000);