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

    private handleArrowKeys(event: KeyboardEvent) {
        
        if (event.key.startsWith('Arrow') && !event.altKey && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
            
            console.log("navigating");
            
            const currentEditable = document.activeElement as HTMLElement;
    
            if (currentEditable && currentEditable.isContentEditable) {
                if (this.shouldSwitchEditable(currentEditable, event.key)) {
                    event.preventDefault();
                    event.stopPropagation();
                    const nextEditable = this.findNextEditable(currentEditable, event.key);
                    if (nextEditable) {

                        requestAnimationFrame(() => {
                            nextEditable.focus();
                        })
                        this.placeCaretInSimilarPosition(currentEditable, nextEditable);
                    }
                }
            }
        }
    }

    private shouldSwitchEditable(element: HTMLElement, key: string): boolean {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const atStart = range.startOffset === 0 && sel.anchorNode === element.firstChild;
            const atEnd = range.endOffset === element.textContent?.length && sel.focusNode === element.lastChild;
    
            const isAtLastLine = this.isAtLineBoundary(element, 'last');
            const isAtFirstLine = this.isAtLineBoundary(element, 'first');
    
            if ((key === 'ArrowLeft' && atStart) || (key === 'ArrowRight' && atEnd) || 
                (key === 'ArrowUp' && (atStart || isAtFirstLine)) || 
                (key === 'ArrowDown' && (atEnd || isAtLastLine))) {
                return true;
            }
            return false;
        }
        return false;
    }

    private isAtLineBoundary(element: HTMLElement, boundary: 'first' | 'last'): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;
    
        const range = selection.getRangeAt(0);
        const rect = range.getClientRects()[0];
    
        if (!rect) return false;
    
        const elementRect = element.getBoundingClientRect();
        const tolerance = 2;
    
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
}