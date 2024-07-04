abstract class JNode<T extends JNode<T>> {

    previousNode: T | null = null;
    nextNode: T | null = null;

    constructor() {

    }

    setNext(node: T): void {
        this.nextNode = node;
    }

    setPrevious(node: T): void {
        this.previousNode = node;
    }

    getNextSatisfying(predicate: (node: T) => boolean): T | null {
        let current = this.nextNode;
        while (current !== null) {
            if (predicate(current)) {
                return current;
            }
            current = current.nextNode;
        }
        return null;
    }

    getPreviousSatisfying(predicate: (node: T) => boolean): T | null {
        let current = this.previousNode;
        while (current !== null) {
            if (predicate(current)) {
                return current;
            }
            current = current.previousNode;
        }
        return null;
    }
}

export default JNode;


// Example usage:
// Assume we have a class QuickMenuItem that extends JNode.
// class QuickMenuItem extends JNode {
//     constructor(value) {
//         super(value);
//     }
// }
// let menuList = new JLinkedList();
// let item = new QuickMenuItem("Item 1");
// menuList.append(item);