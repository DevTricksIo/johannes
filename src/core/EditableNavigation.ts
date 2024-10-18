import { DOMUtils } from "@/utilities/DOMUtils";
import { IEditableNavigation } from "./IEditableNavigation";
import { Directions } from "@/common/Directions";
import { Boundaries } from "@/common/Boundaries";
import { TableUtils } from "@/utilities/TableUtils";
import { IQuickMenu } from "@/components/quick-menu/IQuickMenu";
import { DependencyContainer } from "./DependencyContainer";
import { DefaultJSEvents } from "@/common/DefaultJSEvents";

export class EditableNavigation implements IEditableNavigation {

    private static instance: EditableNavigation;

    quickMenu: IQuickMenu;

    private constructor(quickMenu: IQuickMenu) {
        document.addEventListener(DefaultJSEvents.Keydown, this.handleArrowKeys.bind(this));

        this.quickMenu = quickMenu;
    }

    listen(): void {
        console.log("EditableNavigation is now listening for key events.");
    }

    public static getInstance(): EditableNavigation {

        if (!EditableNavigation.instance) {

            const quickMenu = DependencyContainer.Instance.resolve<IQuickMenu>("IQuickMenu");

            EditableNavigation.instance = new EditableNavigation(quickMenu);
        }
        return EditableNavigation.instance;
    }

    private handleArrowKeys(event: KeyboardEvent) {

        if(!event.key.startsWith('Arrow')){
            return;
        }

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

    private shouldSwitchEditable(element: HTMLElement, direction: Directions): boolean {

        const sel = window.getSelection();

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

    private findNextEditable(current: HTMLElement, direction: Directions): HTMLElement | null {
        const allEditables = Array.from(document.querySelectorAll('[contenteditable="true"]')) as HTMLElement[];
        const currentIndex = allEditables.indexOf(current);

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