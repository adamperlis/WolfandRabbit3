'use strict';

var randomstring = require('randomstring')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('./.env.js');
var stripe = require("stripe")(config.stripeKey);
var sendgrid  = require('sendgrid')(config.sendgridKey);
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var knex = require('knex')({
  client: 'mysql',
  connection: {
  	host: config.mysql.host,
  	user: config.mysql.user,
  	password: config.mysql.password,
	database: config.mysql.database,	
    charset  : 'utf8'
  }
});

var Tag = require('./models/tag.js')(knex);
var License = require('./models/license.js')(knex);
var Track = require('./models/track.js')(knex, Tag, License);
var Download = require('./models/download.js')(knex, Track);

app.set('views', __dirname);
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/api/tracks', function(req, res){

	new Track().fetchAll({
		withRelated: ['tags', 'licenses']
	}).then(function(model) {	
		res.send({
			data: model
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
		// console.log(err, charge)

		
		if (err) {
			// return res.status(500)
			// Somethings wrong with Stripe.
		}

		var downloads = [];
		for (var i = req.body.cart.items.length - 1; i >= 0; i--) {
			new Download({
				track_id: req.body.cart.items[i].id,
				code: randomstring.generate(7)
			}).save().then(function(model){
				downloads.push(model);

				console.log(model.related('track'));

				if (downloads.length == req.body.cart.items.length) {
					// console.log(downloads);
					console.log('complete, send the damn email');
					return
					fs.readFile(__dirname + '/emailTemplate.ejs', 'utf-8', function(err, template) {


						var compiled = ejs.render(template, {items: downloads})

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
				}

			})
		}

		
	});


});

//"tok_15p54qIwhXnZzVoeXp4ZzG4F"

app.get('*', function(req, res) {
	res.render("index.html");
});

app.listen(80, function() {
	console.log("server started");
});