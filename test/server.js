var chaussette = require('../lib/chaussette'),
	url = require('url'),
	fs = require('fs');
	
var server = chaussette.createChaussette('http://localhost:8888/','casimir')
	.use('/',function(req, res){ 
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		res.write(fs.readFileSync('index.html')); 
		res.end();
	});

server.listen(8000);