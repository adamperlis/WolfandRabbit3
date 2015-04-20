'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./.env.js');
var stripe = require("stripe")(config.stripeKey);

console.log(config.stripeKey)

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/charge', function(req, res) {
	console.log('charged', req.body.token)

	var charge = stripe.charges.create({
		amount: req.body.amount*100, // amount in cents, again
		currency: "usd",
		source: req.body.token,
		description: "payinguser@example.com"
	}, function(err, charge) {
		console.log(err)
		
		if (err) {
			res.status(500)
			// Somethings wrong with Stripe.
	
		}

		res.end();
	});


});

//"tok_15p54qIwhXnZzVoeXp4ZzG4F"

app.get('*', function(req, res) {
	console.log('Request Handled')
	res.render("index.html");
});

app.listen(80, function() {
	console.log("server started");
});