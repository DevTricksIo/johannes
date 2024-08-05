import { DOMUtils } from "@/utilities/DOMUtils";
import { IEditableNavigation } from "./IEditableNavigation";

/**
 * Provides navigation capabilities within editable elements on a web page.
 * This class handles keyboard events to navigate between contenteditable elements using arrow keys,
 * and ensures focus management and caret placement within these elements.
 * It implements the `IEditableNavigation` interface and uses a singleton pattern to manage its instance.
 */
export class EditableNavigation implements IEditableNavigation {

    private static instance: EditableNavigation;

    /**
     * Private constructor to prevent external instantiation.
     * It binds the `handleArrowKeys` method to keyboard events on the document.
     */
    private constructor() {
        document.addEventListener('keydown', this.handleArrowKeys.bind(this));
    }

    /**
     * Acts as a trigger within the dependency injection container to ensure instantiation of this singleton class.
     * This method does not perform any operations itself but ensures that an instance of EditableNavigation
     * is created and ready to listen to keyboard events. This is crucial for setting up the event listeners
     * that manage navigation within editable content areas, as it triggers the necessary bindings upon instantiation.
     */
    listen(): void {
        console.log("EditableNavigation is now listening for key events.");
    }

    /**
     * Retrieves the singleton instance of the EditableNavigation class.
     * If the instance does not exist, it creates a new one.
     * @returns {EditableNavigation} The singleton instance of the EditableNavigation class.
     */
    public static getInstance(): EditableNavigation {
        if (!EditableNavigation.instance) {
            EditableNavigation.instance = new EditableNavigation();
        }
        return EditableNavigation.instance;
    }

    private handleArrowKeys(event: KeyboardEvent) {

        if (event.key.startsWith('Arrow') && !event.altKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {

            const currentEditable = document.activeElement as HTMLElement;

            if (currentEditable && currentEditable.isContentEditable) {
                if (this.shouldSwitchEditable(currentEditable, event.key as Direction)) {

                    event.preventDefault();
                    event.stopPropagation();

                    const nextEditable = this.findNextEditable(currentEditable, event.key as Direction);
                    if (nextEditable) {

                        requestAnimationFrame(() => {
                            nextEditable.focus();
                        });

                        requestAnimationFrame

                        if(event.key == Direction.ArrowUp || event.key == Direction.ArrowDown){
                            this.placeCaretInSimilarPosition(currentEditable, nextEditable);
                        }

                        if(event.key == Direction.ArrowLeft){
                            DOMUtils.placeCursorAtEndOfEditableElement(nextEditable);
                        }

                        if(event.key == Direction.ArrowRight){
                            DOMUtils.placeCursorAtStartOfEditableElement(nextEditable);
                        }

                    }
                }
            }
        }
    }

    private shouldSwitchEditable(element: HTMLElement, direction: Direction): boolean {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const { atStart, atEnd } = this.getSelectionTextInfo(element);
            const isAtFirstLine = this.isAtLineBoundary(element, Boundary.First);
            const isAtLastLine = this.isAtLineBoundary(element, Boundary.Last);

            if ((direction === Direction.ArrowLeft && atStart) || (direction === Direction.ArrowRight && atEnd) ||
                (direction === Direction.ArrowUp && (atStart || isAtFirstLine)) ||
                (direction === Direction.ArrowDown && (atEnd || isAtLastLine))) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    private isAtLineBoundary(element: HTMLElement, boundary: Boundary): boolean {

        const hasTextContent = element.textContent?.trim() !== "";

        if (!hasTextContent) {
            return true;
        }

        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;

        const range = selection.getRangeAt(0);
        const rect = range.getClientRects()[0];

        if (!rect) return true;

        const elementRect = element.getBoundingClientRect();
        const tolerance = 11;

        if (boundary === Boundary.First) {
            return Math.abs(rect.top - elementRect.top) < tolerance;
        } else if (boundary === Boundary.Last) {
            return Math.abs(rect.bottom - elementRect.bottom) < tolerance;
        }

        return false;
    }

    private findNextEditable(current: HTMLElement, direction: Direction): HTMLElement | null {
        const allEditables = Array.from(document.querySelectorAll('[contenteditable="true"]')) as HTMLElement[];
        const currentIndex = allEditables.indexOf(current);

        if (current.closest("td")) {

            const table = current.closest("table");
            const cell = current.closest("td");

            if (table && cell) {
                const neighborCell = this.getNeighborCell(table, cell, direction);
                if (neighborCell) {
                    return neighborCell;
                }
            }
        }

        let nextIndex = -1;
        if (direction === Direction.ArrowLeft || direction === Direction.ArrowRight) {
            nextIndex = direction === Direction.ArrowLeft ? currentIndex - 1 : currentIndex + 1;
        } else {
            nextIndex = this.findVerticalEditable(current, allEditables, direction);
        }

        if (nextIndex < 0) {
            nextIndex = allEditables.length - 1;
        } else if (nextIndex >= allEditables.length) {
            nextIndex = 0;
        }

        return allEditables[nextIndex] || null;
    }

    getNeighborCell(table: HTMLTableElement, cell: HTMLTableCellElement, direction: Direction): HTMLTableCellElement | null {

        if (!cell.parentElement) {
            return null;
        }

        const rowIndex = (cell.parentElement as HTMLTableRowElement).rowIndex;
        const cellIndex = cell.cellIndex;

        switch (direction) {
            case Direction.ArrowRight:
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex + 1] ?? null;
            case Direction.ArrowLeft:
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex - 1] ?? null;
            case Direction.ArrowUp:
                return table.rows[rowIndex - 1]?.cells[cellIndex] ?? null;
            case Direction.ArrowDown:
                return table.rows[rowIndex + 1]?.cells[cellIndex] ?? null;
        }

        return null;
    }

    private findVerticalEditable(current: HTMLElement, allEditables: HTMLElement[], direction: Direction): number {
        const currentIndex = allEditables.indexOf(current);
        const currentRect = current.getBoundingClientRect();
        let closestIndex = -1;
        let closestDistance = Infinity;

        allEditables.forEach((editable, index) => {
            if (editable !== current) {
                const rect = editable.getBoundingClientRect();
                const verticalDistance = direction === Direction.ArrowUp ? currentRect.top - rect.bottom : rect.top - currentRect.bottom;
                const horizontalDistance = Math.abs(currentRect.left - rect.left);

                if (verticalDistance > 0 && (verticalDistance + horizontalDistance < closestDistance)) {
                    closestDistance = verticalDistance + horizontalDistance;
                    closestIndex = index;
                }
            }
        });

        return closestIndex === -1 ? currentIndex : closestIndex;
    }

    private placeCaretInSimilarPosition(current: HTMLElement, next: HTMLElement) {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const currentRange = sel.getRangeAt(0);
            const rect = currentRange.getBoundingClientRect();

            sel.removeAllRanges();
            const range = document.createRange();

            const walker = document.createTreeWalker(next, NodeFilter.SHOW_TEXT);
            let node = walker.nextNode();
            let bestNode = node;
            let bestOffset = 0;
            let bestDistance = Infinity;

            if (bestNode) {
                do {
                    if (!node || !node.nodeValue) continue;

                    range.setStart(node, 0);
                    range.setEnd(node, node.nodeValue.length);

                    for (let i = 0; i < node.nodeValue.length; i++) {
                        range.setStart(node, i);
                        range.collapse(true);
                        const testRect = range.getBoundingClientRect();

                        const horizontalDistance = Math.abs(testRect.left - rect.left);
                        if (horizontalDistance < bestDistance) {
                            bestDistance = horizontalDistance;
                            bestNode = node;
                            bestOffset = i;
                        }
                    }
                } while (node = walker.nextNode());

                range.setStart(bestNode, bestOffset);
                range.collapse(true);
                sel.addRange(range);
            } else {
                range.selectNodeContents(next);
                range.collapse(true);
                sel.addRange(range);
            }
        }
    }

    /**
    * Determines whether the current selection is at the start or end of a contenteditable element.
    * This function was adapted from a StackOverflow answer.
    *
    * @param {HTMLElement} el - The contenteditable element to check.
    * @returns {Object} An object containing two boolean properties: `atStart` and `atEnd`.
    *
    * @see {@link https://stackoverflow.com/questions/7451468/contenteditable-div-how-can-i-determine-if-the-cursor-is-at-the-start-or-end-o#answer-7478420|StackOverflow Response}
    * @example
    * // Returns { atStart: true, atEnd: false } if the cursor is at the start of the element, but not at the end.
    * const result = getSelectionTextInfo(document.getElementById('editable'));
    */
    getSelectionTextInfo(el: HTMLElement): { atStart: boolean; atEnd: boolean } {

        let atStart = false, atEnd = false;

        if (el.textContent == "") {
            atStart = true;
            atEnd = true;

            return { atStart, atEnd }
        }

        let selRange: Range, testRange: Range;

        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            selRange = sel.getRangeAt(0);
            testRange = document.createRange();

            testRange.selectNodeContents(el);
            testRange.setEnd(selRange.startContainer, selRange.startOffset);
            atStart = testRange.toString() === "";

            testRange.selectNodeContents(el);
            testRange.setStart(selRange.endContainer, selRange.endOffset);
            atEnd = testRange.toString() === "";
        }

        return { atStart, atEnd };
    }

}


/**
 * Enum for keyboard arrow directions.
 * @enum {string}
 */
enum Direction {
    /** Represents the 'ArrowUp' key, used to navigate upwards in the Editor. */
    ArrowUp = "ArrowUp",
    /** Represents the 'ArrowDown' key, used to navigate downwards in the Editor. */
    ArrowDown = "ArrowDown",
    /** Represents the 'ArrowLeft' key, used to navigate left in the Editor. */
    ArrowLeft = "ArrowLeft",
    /** Represents the 'ArrowRight' key, used to navigate right in the Editor. */
    ArrowRight = "ArrowRight",
}

/**
 * Enum for specifying boundaries within an element.
 * @enum {string}
 */
enum Boundary {
    /** Represents the first line of an element, important for determining if the cursor is at the starting boundary. */
    First = "First",
    /** Represents the last line of an element, important for determining if the cursor is at the ending boundary. */
    Last = "Last"
}