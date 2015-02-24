'use strict'

require('angular')
require('angular-ui-router')
require('angular-resource')
require('angular-animate')
require('./modules/Modal')
require('./modules/UI')

// require('./js/parallax')
// require('./js/animated-nav')
// require('./js/audio-player')

angular.module("wolfandrabbit2", [
	'ui.router', 
	'ngResource', 
	'Modal', 
	'UI'
])

.config(require('./routes'))

.controller('homeCtrl', ['$scope', '$state', '$resource', 'Videos', require('./controllers/homeCtrl.js')])
.controller('aboutCtrl', ['$scope', '$state', require('./controllers/aboutCtrl.js')])
.controller('libCtrl', ['$scope', '$state', 'Tracks', require('./controllers/libCtrl.js')])

.service('Videos', ['$resource', '$q', 'Video', require('./services/Videos.js')])
.service('Tracks', ['$resource', '$q', 'Track', require('./services/Tracks.js')])

.factory('Video', ['$sce', 'Modals', require('./factories/Video.js')])
.factory('Track', [ require('./factories/Track.js')])

angular.bootstrap(document, ["wolfandrabbit2"]);

//Put your damn google analytics number here 
(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create','UA-XXXXX-X');ga('send','pageview');