	var express = require('express');
	var app = express(); 	
	var mongoose = require('mongoose'); 					
  var http = require("http");
  var url = require("url");
	var port = process.env.PORT || 8080;
  var config = require('./config/config.js'); 				
  
	app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use('/bower_components',  express.static(__dirname + '/bower_components'));
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});
  
  app.get('/api/nlp', function(req, res) {
    var query = url.parse(req.url, true).query;
    var keyword = query.keyword;

    var options = {
      host: 'localhost',
      port: 55006,
      method: 'GET',
      path: '/api/nlp?keyword=' + encodeURIComponent(keyword)
    };

  var request = http.request(options, function(response) {
    response.setEncoding('utf-8');
    var responseString = '';
    response.on('data', function(data) {
      responseString += data;
    });
    response.on('end', function() {
      var resultObject = JSON.parse(responseString);
      // console.log(resultObject);
      res.json(resultObject);
    });
  });

  request.on('error', function(e) {
    console.log(e);
  });

  request.end();  

    // http.get(options, function(result) {
    //   console.log("Got response: " + result.statusCode);
    //   result.on("data", function(data) {
    //     try {
    //       var sentiments = JSON.parse(data);
    //       console.log('valid json');
    //       res.json(sentiments);
    //     } catch (e){
    //       console.log(e);
    //     }
    //   });
    // }).on('error', function(e) {
    //   console.log("Got error: " + e.message);
    // });

  });

  app.get('/tata', function(req, res) {
    res.json({a: 'bar'});
  });

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	// listen (start app with node server.js) ======================================
	app.listen(port);
	console.log("App listening on port " + port);

