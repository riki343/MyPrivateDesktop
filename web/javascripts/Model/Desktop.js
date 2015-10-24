(function (angular) {
	angular.module('models').factory('Desktop', DesktopFactory);

	DesktopFactory.$inject = ['$http', '$q'];

	function DesktopFactory($http, $q) {
		function Desktop(data) {
			if (angular.isDefined(data)) {
				this.id = data.id;
				this.userId = data.userId;
				this.grid = data.grid;
				this.settings = data.settings;
				this.created = data.created;
				this.updated = data.updated;
			} else {
				this.id = 0;
				this.userId = 0;
				this.grid = [];
				this.settings = [];
				this.created = new Date();
				this.updated = new Date();
			}
		}

		Desktop.prototype.saveGrid = function (id, grid) {
			var promise = $http.put(Routing.generate('save-desktop-grid',
				{ 'desktop_id': id }, grid)
			);

			return handlePromise(promise);
		};

		Desktop.get = function(id) {
			var promise = $http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
			return handlePromise(promise);
		};

		function handlePromise(promise) {
			var defer = $q.defer();
			promise
				.success(function (response) {
					defer.resolve(response);
				})
				.error(function () {
					defer.resolve(null);
				})
			;

			return defer.promise;
		}

		return (Desktop);
	}
})(angular);