var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var app = express();
var port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/bower_components')));

require('./app/routes.js')(app);

mongoose.connect('mongodb://testContacts:1234@ds023438.mlab.com:23438/contacts');
mongoose.connection.once('open', function () {
	app.models = require('./app/models/index');
	var routes = require('./app/controllers/routes');
	_.each(routes, function (controller, route) {
		app.use(route, controller(app, route));
	});
	app.listen(port, function () {
		console.log('Listening on port: ' + port);
	});
});


