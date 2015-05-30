'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./.env.js');
var stripe = require("stripe")(config.stripeKey);
var sendgrid  = require('sendgrid')(config.sendgridKey);
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: config.mysql.host,
	database: config.mysql.database,
	user: config.mysql.user,
	password: config.mysql.password
})

connection.connect();

console.log(config.sendgridUser)
console.log(config.sendgridKey)

app.set('views', __dirname);
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/api/tracks', function(req, res){

	connection.query('SELECT tracks.*, tags.tag FROM tracks JOIN tags_tracks ON tags_tracks.track_id = tracks.id JOIN tags ON tags_tracks.tag_id = tags.id;', function(err, rows, fields){
		console.log(rows)
		console.log(err)

		res.send({
			data: rows
		});
	})

})

app.post('/charge', function(req, res) {
	// console.log('charged', req.body, req.body.cart.items[0])

	var charge = stripe.charges.create({
		amount: req.body.amount*100, // amount in cents, again
		currency: "usd",
		source: req.body.token,
		description: "payinguser@example.com",
		receipt_email: req.body.email
	}, function(err, charge) {
		console.log(err, charge)
		
		if (err) {
			// return res.status(500)
			// Somethings wrong with Stripe.
		}

		fs.readFile(__dirname + '/emailTemplate.ejs', 'utf-8', function(err, template) {

			console.log(req.body);

			var compiled = ejs.render(template, req.body)

			sendgrid.send({
			  to:       req.body.email,
			  from:     'adam.perlis@gmail.com',
			  subject: 	'Your Wolf & Rabbit Music Download',
			  cc:       'adam.perlis@gmail.com',
			  html:     compiled
			}, function(err, json) {
			  if (err) { return console.error("SENDGRID: ", err); }
			  
			  // console.log(json);
			});
		})

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