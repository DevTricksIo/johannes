import JNode from "./JNode";

abstract class BaseDoublyLinkedList<T> {

    head: JNode<T> | null = null;
    tail: JNode<T> | null = null;

    length: number = 0;

    abstract append(element: T): void;

    getFirst(): JNode<T> | null {
        return this.head;
    }

    getLast(): JNode<T> | null {
        return this.tail;
    }

    *[Symbol.iterator]() {
        let current = this.head;
        if (!current) return;
        do {
            yield current;
            current = current.nextNode;
        } while (current && current !== this.head);
    }

    forEach(callback: (node: T, index: number, list: BaseDoublyLinkedList<T>) => void): void {
        let index = 0;
        for (let node of this) {
            callback(node.value, index, this);
            index++;
        }
    }

    any(predicate: (node: T) => boolean): boolean {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return true;
            }
            current = current.nextNode;
            if (current === this.head) break;
        }
        return false;
    }

    findFirst(predicate: (node: T) => boolean): JNode<T> | null {
        if (!this.head) return null;

        let current: null | JNode<T> = this.head;
        do {
            if (predicate(current.value)) {
                return current;
            }
            current = current.nextNode;
        } while (current && current !== this.head);

        return null;
    }

    findLast(predicate: (node: T) => boolean): JNode<T> | null {
        if (!this.tail) return null;

        let current: null | JNode<T> = this.tail;

        do {
            if (predicate(current.value)) {
                return current;
            }
            current = current.previousNode;
        } while (current && current !== this.tail);

        return null;
    }

    find(element: T): JNode<T> | null {

        let current: JNode<T> | null = this.head;

        while (current) {
            if (current.value == element) {
                return current;
            }

            current = current.nextNode;
            if (current === this.head) break;
        }

        return null;
    }
}

export default BaseDoublyLinkedList;