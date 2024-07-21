import { BaseDoublyLinkedList } from "./BaseDoublyLinkedList";

export class JNode<T> {

    parentList: BaseDoublyLinkedList<T>;

    previousNode: JNode<T> | null;
    nextNode: JNode<T> | null;
    value: T;

    constructor(value: T, parentList: BaseDoublyLinkedList<T>) {
        this.previousNode = null;
        this.nextNode = null;
        this.value = value;
        this.parentList = parentList;
    }

    setNext(node: JNode<T>): void {
        this.nextNode = node;
    }

    setPrevious(node: JNode<T>): void {
        this.previousNode = node;
    }

    getNextSatisfying(predicate: (node: T) => boolean): JNode<T> | null {
        let current = this.nextNode;
        const startNode = this;
        while (current) {
            if (predicate(current.value)) {
                return current;
            }
            current = current.nextNode;
            if (current === startNode) {
                break;
            }
        }
        return null;
    }

    getPreviousSatisfying(predicate: (node: T) => boolean): JNode<T> | null {
        let current = this.previousNode;
        const startNode = this;
        while (current && current !== startNode) {
            if (predicate(current.value)) {
                return current;
            }
            current = current.previousNode;
            if (current === this) {
                break;
            }
        }
        return null;
    }
}