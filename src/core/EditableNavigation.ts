import { IEditableNavigation } from "./IEditableNavigation";

export class EditableNavigation implements IEditableNavigation {

    private static instance: EditableNavigation;

    private constructor() {
        document.addEventListener('keydown', this.handleArrowKeys.bind(this));
    }

    listen(): void {
        console.log("EditableNavigation is now listening for key events.");
    }

    public static getInstance(): EditableNavigation {
        if (!EditableNavigation.instance) {
            EditableNavigation.instance = new EditableNavigation();
        }
        return EditableNavigation.instance;
    }

    private async handleArrowKeys(event: KeyboardEvent) {

        requestAnimationFrame(async () => {
            if (event.key.startsWith('Arrow') && !event.altKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {

                console.log("navigating");

                const currentEditable = document.activeElement as HTMLElement;

                if (currentEditable && currentEditable.isContentEditable) {
                    if (await this.shouldSwitchEditable(currentEditable, event.key)) {

                        event.preventDefault();
                        event.stopPropagation();

                        const nextEditable = this.findNextEditable(currentEditable, event.key);
                        if (nextEditable) {

                            requestAnimationFrame(() => {
                                nextEditable.focus();
                            });

                            this.placeCaretInSimilarPosition(currentEditable, nextEditable);
                        }
                    }
                }
            }
        });


    }

    private shouldSwitchEditable(element: HTMLElement, key: string): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const sel = window.getSelection();
                if (sel && sel.rangeCount > 0) {
                    const { atStart, atEnd } = this.getSelectionTextInfo(element);
                    const isAtLastLine = this.isAtLineBoundary(element, 'last');
                    const isAtFirstLine = this.isAtLineBoundary(element, 'first');

                    if ((key === 'ArrowLeft' && atStart) || (key === 'ArrowRight' && atEnd) ||
                        (key === 'ArrowUp' && (atStart || isAtFirstLine)) ||
                        (key === 'ArrowDown' && (atEnd || isAtLastLine))) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            }, 10);
        });
    }


    private isAtLineBoundary(element: HTMLElement, boundary: 'first' | 'last'): boolean {

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

        if (boundary === 'first') {
            return Math.abs(rect.top - elementRect.top) < tolerance;
        } else if (boundary === 'last') {
            return Math.abs(rect.bottom - elementRect.bottom) < tolerance;
        }

        return false;
    }

    private findNextEditable(current: HTMLElement, direction: string): HTMLElement | null {
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
        if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
            nextIndex = direction === 'ArrowLeft' ? currentIndex - 1 : currentIndex + 1;
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

    getNeighborCell(table: HTMLTableElement, cell: HTMLTableCellElement, direction: string): HTMLTableCellElement | null {

        if (!cell.parentElement) {
            return null;
        }

        const rowIndex = (cell.parentElement as HTMLTableRowElement).rowIndex;
        const cellIndex = cell.cellIndex;

        switch (direction) {
            case "ArrowRight":
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex + 1] ?? null;
            case "ArrowLeft":
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex - 1] ?? null;
            case "ArrowUp":
                return table.rows[rowIndex - 1]?.cells[cellIndex] ?? null;
            case "ArrowDown":
                return table.rows[rowIndex + 1]?.cells[cellIndex] ?? null;
        }

        return null;
    }

    private findVerticalEditable(current: HTMLElement, allEditables: HTMLElement[], direction: string): number {
        const currentIndex = allEditables.indexOf(current);
        const currentRect = current.getBoundingClientRect();
        let closestIndex = -1;
        let closestDistance = Infinity;

        allEditables.forEach((editable, index) => {
            if (editable !== current) {
                const rect = editable.getBoundingClientRect();
                const verticalDistance = direction === 'ArrowUp' ? currentRect.top - rect.bottom : rect.top - currentRect.bottom;
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

        if(el.textContent == ""){
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
