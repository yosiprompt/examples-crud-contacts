angular.module('contacts').controller('viewContactController', function ($scope, $routeParams, Person) {
	$scope.viewPerson = true;
	$scope.person = Person.one($routeParams.id).get().$object;
});