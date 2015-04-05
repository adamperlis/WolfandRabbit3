'use strict';

var express = require('express');
var app = express();
var stripe = require("stripe")("sk_test_dtXPoQWDNFFz4uQJ1xxBXQrm");

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname));


app.get('*', function(req, res) {
	res.render("index.html");
});

app.listen(80, function() {
	console.log("server started");
});