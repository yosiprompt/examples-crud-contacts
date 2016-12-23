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