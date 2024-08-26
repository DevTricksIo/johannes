import { DOMUtils } from "@/utilities/DOMUtils";
import { IEditableNavigation } from "./IEditableNavigation";
import { Directions } from "@/common/Directions";
import { Boundaries } from "@/common/Boundaries";
import { TableUtils } from "@/utilities/TableUtils";
import { IQuickMenu } from "@/components/quick-menu/IQuickMenu";
import { DependencyContainer } from "./DependencyContainer";

/**
 * This class handles keyboard events to navigate between contenteditable elements using arrow keys,
 * and ensures focus management and caret placement within these elements.
 * It implements the `IEditableNavigation` interface and uses a singleton pattern to manage its instance.
 */
export class EditableNavigation implements IEditableNavigation {

    private static instance: EditableNavigation;

    quickMenu: IQuickMenu;

    /**
     * Private constructor to prevent external instantiation.
     * It binds the `handleArrowKeys` method to keyboard events on the document.
     */
    private constructor(quickMenu: IQuickMenu) {
        document.addEventListener('keydown', this.handleArrowKeys.bind(this));

        this.quickMenu = quickMenu;
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

            const quickMenu = DependencyContainer.Instance.resolve<IQuickMenu>("IQuickMenu");

            EditableNavigation.instance = new EditableNavigation(quickMenu);
        }
        return EditableNavigation.instance;
    }

    private handleArrowKeys(event: KeyboardEvent) {

        if (!this.quickMenu.isVisible && event.key.startsWith('Arrow') && !event.altKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {

            const currentEditable = document.activeElement as HTMLElement;

            if (currentEditable && currentEditable.isContentEditable) {
                if (this.shouldSwitchEditable(currentEditable, event.key as Directions)) {

                    const nextEditable = this.findNextEditable(currentEditable, event.key as Directions);
                    if (nextEditable) {

                        event.preventDefault();
                        event.stopImmediatePropagation();

                        if (event.key == Directions.ArrowUp || event.key == Directions.ArrowDown) {
                            this.placeCaretInSimilarPosition(currentEditable, nextEditable);
                        }

                        if (event.key == Directions.ArrowLeft) {
                            DOMUtils.placeCursorAtEndOfEditableElement(nextEditable);
                        }

                        if (event.key == Directions.ArrowRight) {
                            DOMUtils.placeCursorAtStartOfEditableElement(nextEditable);
                        }

                        nextEditable.focus();
                    }
                }
            }
        }
    }

    /**
    * Determines if navigation should switch from the current editable element based on the arrow direction and caret position.
    * It checks if the caret is at the start or end of the content and evaluates boundary conditions for vertical navigation.
    * 
    * @param {HTMLElement} element - The current contenteditable element being evaluated.
    * @param {Directions} direction - The navigation direction indicated by the arrow key press.
    * @returns {boolean} Returns true if the navigation should move to another element, false otherwise.
    */
    private shouldSwitchEditable(element: HTMLElement, direction: Directions): boolean {

        // DOMUtils.sanitizeContentEditable(element);
        const sel = window.getSelection();

        // If has selection ignore navigation 
        if (sel && sel.rangeCount > 0) {
            let range = sel.getRangeAt(0);
            if (range.endOffset != range.startOffset) {
                return false;
            }
        }

        if (sel && sel.rangeCount > 0) {
            const { atStart, atEnd } = DOMUtils.getSelectionTextInfo(element);
            const isAtFirstLine = this.isAtLineBoundary(element, Boundaries.First);
            const isAtLastLine = this.isAtLineBoundary(element, Boundaries.Last);

            if ((direction === Directions.ArrowLeft && atStart) || (direction === Directions.ArrowRight && atEnd) ||
                (direction === Directions.ArrowUp && (atStart || isAtFirstLine)) ||
                (direction === Directions.ArrowDown && (atEnd || isAtLastLine))) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    private isAtLineBoundary(element: HTMLElement, boundary: Boundaries): boolean {

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

        if (boundary === Boundaries.First) {
            return Math.abs(rect.top - elementRect.top) < tolerance;
        } else if (boundary === Boundaries.Last) {
            return Math.abs(rect.bottom - elementRect.bottom) < tolerance;
        }

        return false;
    }

    /**
    * Locates the next contenteditable element in the specified navigation direction.
    * This function takes into account both horizontal (left/right) and vertical (up/down) directions and handles table cell boundaries.
    * 
    * @param {HTMLElement} current - The current contenteditable element.
    * @param {Directions} direction - The direction of the arrow key navigation.
    * @returns {HTMLElement | null} The next contenteditable element in the desired direction or null if no suitable element is found.
    */
    private findNextEditable(current: HTMLElement, direction: Directions): HTMLElement | null {
        const allEditables = Array.from(document.querySelectorAll('[contenteditable="true"]')) as HTMLElement[];
        const currentIndex = allEditables.indexOf(current);

        // The table navigation behavior is a little different
        if (current.closest("td")) {
            const table = current.closest("table");
            const cell = current.closest("td");
            if (table && cell) {
                const neighborCell = TableUtils.getNeighborCell(table, cell, direction);
                if (neighborCell) {
                    return neighborCell;
                }
            }
        }

        let nextIndex = -1;
        if (direction === Directions.ArrowLeft || direction === Directions.ArrowRight) {
            nextIndex = direction === Directions.ArrowLeft ? currentIndex - 1 : currentIndex + 1;
        } else {
            nextIndex = this.findVerticalEditableIndex(current, allEditables, direction);
        }

        if (nextIndex < 0 || nextIndex >= allEditables.length) {
            return null;
        }

        return allEditables[nextIndex] || null;
    }

    /**
    * Finds the next contenteditable element in a vertical direction (up or down) relative to the current element.
    * It calculates the closest editable element based on vertical distance and minimal horizontal shift, favoring elements directly above or below.
    * 
    * @param {HTMLElement} current - The currently focused contenteditable element.
    * @param {HTMLElement[]} allEditables - An array of all contenteditable elements.
    * @param {Directions} direction - The direction of navigation, either up or down.
    * @returns {number} The index of the closest vertical editable element or the current index if none are closer.
    */
    // private findVerticalEditable(current: HTMLElement, allEditables: HTMLElement[], direction: Directions): number {
    //     const currentIndex = allEditables.indexOf(current);
    //     const currentRect = current.getBoundingClientRect();
    //     let closestIndex = -1;
    //     let closestDistance = Infinity;

    //     allEditables.forEach((editable, index) => {
    //         if (editable !== current) {
    //             const rect = editable.getBoundingClientRect();
    //             const verticalDistance = direction === Directions.ArrowUp ? currentRect.top - rect.bottom : rect.top - currentRect.bottom;
    //             const horizontalDistance = Math.abs(currentRect.left - rect.left);

    //             if (verticalDistance > 0 && (verticalDistance + horizontalDistance < closestDistance)) {
    //                 closestDistance = verticalDistance + horizontalDistance;
    //                 closestIndex = index;
    //             }
    //         }
    //     });

    //     return closestIndex === -1 ? currentIndex : closestIndex;
    // }
    private findVerticalEditableIndex(current: HTMLElement, allEditables: HTMLElement[], direction: Directions): number {
        const currentIndex = allEditables.indexOf(current);
        let nextIndex = currentIndex;
    
        if (direction === Directions.ArrowUp) {
            nextIndex--;
        } else if (direction === Directions.ArrowDown) {
            nextIndex++;
        }
    
        if (nextIndex >= 0 && nextIndex < allEditables.length) {
            return nextIndex;
        }
    
        return -1;
    }

    /**
    * Places the caret in a position within the next element that closely matches its position in the current element.
    * This is useful when moving focus between contenteditable elements to maintain a consistent user experience.
    * 
    * @param {HTMLElement} current - The current contenteditable element where the caret is located.
    * @param {HTMLElement} next - The next contenteditable element to which the caret will move.
    */
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

}