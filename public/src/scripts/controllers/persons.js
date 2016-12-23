angular.module('contacts')
	.controller('personsController', function ($scope, Person) {
		updatePersons();
		function updatePersons() {
			$scope.persons = Person.getList().$object;
			setTimeout(updatePersons, 3000);
		}
	});