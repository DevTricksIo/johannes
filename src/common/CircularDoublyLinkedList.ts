import { BaseDoublyLinkedList } from "./BaseDoublyLinkedList";
import { JNode } from "./JNode";

export class CircularDoublyLinkedList<T> extends BaseDoublyLinkedList<T> {

    constructor() {
        super();
    }

    append(element: T): void {

        const node = new JNode(element, this);

        if (!this.head || !this.tail) {

            this.head = node;
            this.tail = node;

            this.head.setNext(this.tail);
            this.head.setPrevious(this.tail);

        } else {
            node.setPrevious(this.tail);
            node.setNext(this.head);

            this.tail.setNext(node);
            this.head.setPrevious(node);

            this.tail = node;
        }

        this.length++;
    }
}