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