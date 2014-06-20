#!/usr/bin/env node --harmony

/***
 firstServer.js
 This is a simple server illustrating middleware and basic REST functionality
 ***/

'use strict';
const
express = require('express'), bodyParser = require('body-parser'), // this allows us to pass JSON values to the server (see app.put below)
app = express();

var idCounter=4;

var myData = [{
    "id": "morgan",
    "say": "Flowers",
    "image":1
}, {
    "id": "rocky",
    "say": "wasdag",
    "image":2
},
{
    "id": "samuel",
    "say": "wasasfgdag",
    "image":3
},
{
    "id": "rocky",
    "say": "waasfgasfgsdag",
    "image":5
},
{
    "id": "morgan",
    "say": "waafsgasfgsdag",
    "image":6
},
{
    "id": "samuel",
    "say": "wasasfgsafgdag",
    "image":4
},
{
    "id": "rocky",
    "say": "wasasdgasfgdag",
    "image":2
},
{
    "id": "rocky",
    "say": "wasasfgasfgdag",
    "image":2
},
{
    "id": "morgan",
    "say": "Flowers",
    "image":9
}, 
{
    "id": "rocky",
    "say": "wasdag",
    "image":8
},
{
    "id": "samuel",
    "say": "wasasfgdag",
    "image":7
},
{
    "id": "rocky",
    "say": "waasfgasfgsdag",
    "image":5
},
{
    "id": "morgan",
    "say": "waafsgasfgsdag",
    "image":6
},
{
    "id": "samuel",
    "say": "wasasfgsafgdag",
    "image":7
},
{
    "id": "rocky",
    "say": "wasasdgasfgdag",
    "image":2
},
{
    "id": "rocky",
    "say": "wasasfgasfgdag",
    "image":8
}];

// serve static content from the public folder 
app.use("/", express.static(__dirname + '/public'));

app.use(bodyParser.json());


// create middleware to log the requests
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));
    next();
});

// get a particular item from the model
app.get('/model/:id', function(req, res) {
    var n = req.params.id;
    res.json(200, myData[n]);
});


// get all items from the model
app.get('/showall.json', function(req, res) {
    res.json(200, myData);
});

// change an item in the model
app.put('/model/:id', function(req, res) {
    var n = req.params.id;
    myData[n] = req.body;
    // put in some error checking if n <= myData.length
    res.json(200, {});
});

// add new item to the model
app.post('/model', function(req, res) {
    req.body.id = idCounter;
    idCounter++;
    myData.push(req.body);
    res.json(200, {});
});

// get a particular item from the model
app.delete('/model/:id', function(req, res) {
   	 var n = req.params.id;
	for(var i=0; i<myData.length; i++){
	if(myData[i].id == id) {
		myData.splice(n, 1); break;
		}
	}
    res.json(200, {});
});


// listen on port 3000
var port = 3000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});
