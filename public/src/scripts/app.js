angular.module('contacts', ['ngRoute', 'restangular'])
	.config(function ($routeProvider, RestangularProvider) {
		RestangularProvider.setBaseUrl('http://localhost:4000/');
		$routeProvider
			.when('/', {
				templateUrl: '/views/home.html'
			})
			.when('/contact/view', {
				templateUrl: '/views/list-contacts.html',
				controller: 'personsController'
			})
			.when('/add-contact', {
				templateUrl: '/views/add-contact.html',
				controller: 'addContactController'
			})
			.when('/contact/:id/edit', {
				templateUrl: '/views/edit-contact.html',
				controller: 'editContactController'
			})
			.when('/contact/:id/delete', {
				templateUrl: '/views/delete-contact.html',
				controller: 'deleteContactController'
			})
			.when('/contact/:id/view', {
				templateUrl: '/views/view-contact.html',
				controller: 'viewContactController'
			});
	})
	.factory('personRestangular', function (Restangular) {
		return Restangular.withConfig(function (RestangularConfigurer) {
			RestangularConfigurer.setRestangularFields({
				id: '_id'
			});
		});
	})
	.factory('Person', function (personRestangular) {
		return personRestangular.service('person');
	});