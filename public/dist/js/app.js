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
angular.module('contacts').controller('addContactController', function ($scope, Person, $location) {
	$scope.person = {};
	$scope.saveContact = function () {
		if ($scope.addContact.$valid) {
			Person.post($scope.person).then(function () {
				$location.path('/');
			});
		}
	};
});
angular.module('contacts').controller('deleteContactController', function ($scope, $routeParams, Person, $location) {
	$scope.person = Person.one($routeParams.id).get().$object;
	$scope.deleteContact = function () {
		$scope.person.remove().then(function () {
			$location.path('/');
		});
	};
	$scope.back = function () {
		$location.path('/');
	};
});
angular.module('contacts').controller('editContactController', function ($scope, $routeParams, Person, $location) {
	$scope.editContact = true;
	$scope.person = {};
	Person.one($routeParams.id).get().then(function (person) {
		$scope.person = person;
		$scope.saveContact = function () {
			$scope.person.save().then(function () {
				$location.path('/');
			});
		};
	});
});
angular.module('contacts')
	.controller('personsController', function ($scope, Person) {
		updatePersons();
		function updatePersons() {
			$scope.persons = Person.getList().$object;
			setTimeout(updatePersons, 3000);
		}
	});
angular.module('contacts').controller('viewContactController', function ($scope, $routeParams, Person) {
	$scope.viewPerson = true;
	$scope.person = Person.one($routeParams.id).get().$object;
});