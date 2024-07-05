abstract class JNode<T extends JNode<T>> {

    previousNode: T | null;
    nextNode: T | null;

    constructor() {
        this.previousNode = null;
        this.nextNode = null;
    }

    setNext(node: T): void {
        this.nextNode = node;
    }

    setPrevious(node: T): void {
        this.previousNode = node;
    }

    getNextSatisfying(predicate: (node: T) => boolean): T | null {
        let current = this.nextNode;
        while (current) {
            if (predicate(current)) {
                return current;
            }
            current = current.nextNode;
        }
        return null;
    }

    getPreviousSatisfying(predicate: (node: T) => boolean): T | null {
        let current = this.previousNode;
        while (current) {
            if (predicate(current)) {
                return current;
            }
            current = current.previousNode;
        }
        return null;
    }
}

export default JNode;