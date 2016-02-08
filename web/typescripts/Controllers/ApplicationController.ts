/// <reference path='controllers.d.ts' />

module Kernel {
    export class ApplicationController {
        private spinner: boolean;

        static $inject = ['$scope', 'spinnerService'];

        constructor(private scope: ng.IScope, private spinnerService: SpinnerService) {
            // get current state of spinner
            this.spinner = this.spinnerService.getSpinner();

            // Register event listeners
            scope.$on('SpinnerActive', this.onSpinnerActive);
            scope.$on('SpinnerInactive', this.onSpinnerInactive);
        }

        private onSpinnerActive() {
            this.spinner = true;
        }

        private onSpinnerInactive() {
            this.spinner = false;
        }
    }
}