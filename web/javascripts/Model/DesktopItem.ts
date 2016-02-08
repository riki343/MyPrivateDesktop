module Kernel {
    export class DesktopItem {
        private id;
        private desktopId;
        private row;
        private col;
        private type;
        private item;

        constructor(data?: any) {
            if (angular.isDefined(data)) {
                this.id = data.id;
                this.desktopId = data.desktopId;
                this.row = data.row;
                this.col = data.col;
                this.type = data.type;
                this.item = data.item;
            } else {
                this.id = 0;
                this.desktopId = 0;
                this.row = 0;
                this.col = 0;
                this.type = 0;
                this.item = '';
            }
        }
    }
}