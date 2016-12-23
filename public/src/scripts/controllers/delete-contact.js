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