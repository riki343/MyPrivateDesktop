module Kernel {
    export class UniqueList<T> {
        private array: Array<T>;

        constructor(items?: T[]) {
            if (angular.isDefined(items)) {
                this.array = items;
            } else {
                this.array = [];
            }
        }

        public add(item: T): number {
            if (this.array.indexOf(item) === -1) {
                this.array.push(item);
                return this.array.indexOf(item);
            }

            return null;
        }

        public remove(item: T): boolean {
            if (this.array.indexOf(item) !== -1) {
                this.array.splice(this.array.indexOf(item), 1);
                return true;
            }

            return false;
        }

        public removeAt(position: number): boolean {
            if (angular.isDefined(this[position])) {
                this.array.splice(position, 1);
                return true;
            }

            return false;
        }

        public replace(newItem, oldItem): number {
            let index = this.array.indexOf(oldItem);
            if (index !== -1) {
                this[index] = newItem;
                return index;
            }

            return null;
        }

        public get(position: number): T {
            if (angular.isDefined(this.array[position]) === true) {
                return this.array[position];
            }

            return null;
        }
    }
}