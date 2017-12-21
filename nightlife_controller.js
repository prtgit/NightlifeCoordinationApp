var http = require("http");
var qs = require("querystring");
var fs = require("fs");
const yelp = require('yelp-fusion');
var port = 9000;
const client = yelp.client("FxNOIMVrGmaJgitLuE21sosNUtRR4DM4EkgVpk4c0alFnYYW9MCzj-LRlDraDKp8HnBrLo_BjSV8wRrUrC_HjnXyfrqq2Kcw6mQs9FHHt0iUpaaLrl6i3ybeSLQbWnYx");
var server = http.createServer(function (req, resp) {
	if(req.method == 'POST' && req.url == "/"){
		var reqBody = '';
		req.on('data',function (data) {
			reqBody += data;
		});
		req.on('end',function (data) {
			client.search({
				location: reqBody
			}).then(response =>{
				resp.statusCode = 200;
				resp.setHeader('Content-type','application/json');
				resp.write(JSON.stringify(response.jsonBody));
				resp.end();

			}).catch(e => {
				console.log(e);
			});
		});
		
	}
});
server.listen(port,function(){
	console.log("Server listening on port "+port);
});

