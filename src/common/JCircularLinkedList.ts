import JNode from './JNode';

class JCircularLinkedList<T extends JNode<T>> {

    head: T | null = null;
    tail: T | null = null;

    length: number = 0;

    constructor() {

    }

    append(node: T): void {

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

    getFirst(): T | null {
        return this.head;
    }

    getLast(): T | null {
        return this.tail;
    }
}

export default JCircularLinkedList;