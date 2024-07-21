export class Utils {

    static isSelectedTextDescendantOf(parentSelector: string): boolean {
        const selection = document.getSelection();

        if (!selection) {
            return false;
        }

        if (!selection.rangeCount) return false;

        const range = selection.getRangeAt(0);
        let element: Node | null = range.startContainer;

        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }

        if (!element) {
            return false;
        }

        return (element as Element).closest(parentSelector) !== null;
    }

}