import JNode from './JNode';

class JLinkedList<T extends JNode<T>> {

    head: T | null = null;
    tail: T | null = null;

    length: number = 0;

    constructor() {

    }

    append(node: T): void {

        if (!this.head || !this.tail) {

            this.head = node;
            this.tail = node;

        } else {
            this.tail.setNext(node);
            node.setPrevious(this.tail);

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

export default JLinkedList;