(function (angular) {
	angular.module('models').factory('User', UserFactory);

	UserFactory.$inject = [];

	function UserFactory() {
		function User(data) {
			if (angular.isDefined(data)) {
				this.id = data.id;
			} else {
				this.id = 0;
			}
		}

		User.prototype.save = function () {

		};

		User.prototype.delete = function () {

		};

		User.create = function() {

		};

		User.get = function() {

		};

		return (User);
	}
})(angular);