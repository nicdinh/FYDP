var http = require('http');
var port = process.env.port || 1337;
var request = require('request');
var google = 'https://maps.googleapis.com/maps/api/directions/';//http://maps.googleapis.com/maps/api/directions/outputFormat?parameters
var googleKey = 'AIzaSyCxZxh2RK8WMdzdCvk2suDCNmK2KvTiIas'; //maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=AIzaSyCxZxh2RK8WMdzdCvk2suDCNmK2KvTiIas
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var body = [];
    req.on('data', function(chunk){
            body.push(chunk);
        }).on('end', function(){
            console.log('New Request');
            var data = JSON.parse(Buffer.concat(body).toString());

            console.log(data);
            //console.log(JSON.stringify(body,0,4));

            if (!data || !data.origin || !data.destination)
            {
                //res.writeHead(400);
                return res.end('Error');
            }
            var goog = google;
            goog = goog + 'json?origin=' + data.origin;
            goog = goog + '&destination=' + data.destination;
            goog = goog + '&key=' + googleKey;

            request(goog, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return res.end(body); 
                    console.log(body) // Show the HTML for the Google homepage. 
                }
                return res.end(error);
    });
        });
}).listen(port);

/*var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage. 
  }
})*/