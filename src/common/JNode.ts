/**
 * @class
 * Classe abstrata JNode. Deve ser estendida e o tipo do nó deve ser especificado na extensão.
 * @template T O tipo de nó que estende JNode, usado para indicar os tipos de previousNode e nextNode.
 * @example
 * //Assume we have a class QuickMenuItem that extends JNode.
* class QuickMenuItem extends JNode {
*     constructor() {
*         super();
*     }
* }
* let menuList = new JLinkedList();
* let item = new QuickMenuItem("Item 1");
* menuList.append(item);
 */
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