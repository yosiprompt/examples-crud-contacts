var restful = require('node-restful');
module.exports = function (app, route) {
	var rest = restful.model('person', app.models.person).methods(['get', 'put', 'post', 'delete']);
	rest.register(app, route);
	return function (req, res, next) {
		next();
	};
};