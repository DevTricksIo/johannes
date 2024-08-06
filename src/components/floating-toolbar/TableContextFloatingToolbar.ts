import { FloatingToolbar } from "./FloatingToolbar";
import { IFocusStack } from "@/core/IFocusStack";
import { DependencyContainer } from "@/core/DependencyContainer";
import { ITableContextFloatingToolbar } from "./ITableContextFloatingToolbar";
import { ZIndex } from "@/common/ZIndex";
import { Directions } from "../../common/Directions";
import { DefaultJSEvents } from "../../common/DefaultJSEvents";
import { DOMElements } from "../../common/DOMElements";
import { TableUtils } from "@/utilities/TableUtils";
import { KeyboardKeys } from "@/common/KeyboardKeys";
import { TextContextFloatingToolbar } from "./TextContextFloatingToolbar";
import { SelectionModes } from "./SelectionMode";

export class TableContextFloatingToolbar extends FloatingToolbar implements ITableContextFloatingToolbar {

    private static id: string = "tableFloatingToolbar";

    private static instance: TableContextFloatingToolbar;

    focusStack: IFocusStack;
    selectedCells: HTMLTableCellElement[] = [];
    actualFocusedCell: HTMLTableCellElement | null = null;


    controller: AbortController;


    // The selection mode and selectionActiveFlag work together when we start selecting text inside a cell or press shift to activate the selectionActiveFlag.
    // After activating the flag, we can select text inside a cell. If we reach the end of the text inside the cell using shift + directional keys or place the cursor outside
    // the active cell, it indicates that we want to enter cell selection mode. We change the selection mode in these cases.
    selectionMode: SelectionModes = SelectionModes.Text; // The default selection mode
    selectionFlag: boolean = false; // Flag to track whether text selection is active
    selectedText: string = ""; // Storage for the currently selected text

    private constructor(focusStack: IFocusStack) {

        if (TableContextFloatingToolbar.instance) {
            throw new Error("Use TableContextFloatingToolbar.getInstance() to get instance.");
        }

        super(TableContextFloatingToolbar.id);
        this.clearAndHide = this.clearAndHide.bind(this);
        this.htmlElement.style.zIndex = ZIndex.ModeratelyImportant;
        this.controller = new AbortController();
        this.focusStack = focusStack;

        this.attachEvents();
    }

    attachEvents(): void {
        // Mouse events
        document.addEventListener(DefaultJSEvents.Mousedown, this.handleMouseDown.bind(this));
        document.addEventListener(DefaultJSEvents.Mousemove, this.handleMouseMove.bind(this));
        document.addEventListener(DefaultJSEvents.Mouseup, this.handleMouseUp.bind(this));

        // Keyboard events
        document.addEventListener(DefaultJSEvents.Keydown, this.handleStartSelectionInCellKeyDown.bind(this));
        document.addEventListener(DefaultJSEvents.Keydown, this.handleCellSelectionContinuationOnKeyDown.bind(this));
        document.addEventListener(DefaultJSEvents.Keydown, this.handleKeyDown.bind(this));
        document.addEventListener(DefaultJSEvents.Keyup, this.handleKeyUp.bind(this));

        super.attachEvents();
    }

    private handleMouseDown(event: MouseEvent) {

        const target = event.target as HTMLElement;
        const cell = target.closest(DOMElements.TD) as HTMLTableCellElement;

        if (cell) {
            console.log("MouseDown event on: ", event.target);

            event.stopImmediatePropagation();

            this.controller.abort();

            if (cell != this.actualFocusedCell) {
                this.hide();
            }

            this.clearAll();
            this.addSelectedCell(cell);
            this.selectionFlag = true;
            this.selectionMode = SelectionModes.Text;
        }
    }

    private handleMouseMove(event: MouseEvent) {
        if (this.selectionFlag) {

            const target = event.target as HTMLElement;
            const cell = target.closest(DOMElements.TD) as HTMLTableCellElement;

            if (cell) {
                this.updateSelectionModeByMouseEvent(event);
                if (this.selectionMode == SelectionModes.Cell) {

                    event.stopImmediatePropagation();
                    event.preventDefault();

                    if (this.canHide) {
                        this.hide();
                    }

                    this.addSelectedCell(cell);
                    document.getSelection()?.removeAllRanges();
                }
            }
        }
    }

    private handleMouseUp(event: MouseEvent) {
        if (this.selectedCells.length > 0 && this.selectionFlag) {
            this.resetSelectionState();
            this.show();
        }
    }

    private handleKeyDown(event: KeyboardEvent) {

        const target = event.target as HTMLElement;
        const currentCell = target.closest(DOMElements.TD) as HTMLTableCellElement;

        if (currentCell) {

            if (event.key == KeyboardKeys.Enter && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) {
                event.stopImmediatePropagation();
                // alert("jump to next line");
            } else if (event.key == KeyboardKeys.Escape && this.canHide && !TextContextFloatingToolbar.getInstance().isVisible) {

                setTimeout(() => {
                    if (this.canHide) {
                        event.stopImmediatePropagation();
                        this.clearAll();
                        this.hide();
                    }
                }, 10);
            }
        }
    }

    private handleStartSelectionInCellKeyDown(event: KeyboardEvent) {

        const target = event.target as HTMLElement;
        const currentCell = target.closest(DOMElements.TD) as HTMLTableCellElement;

        if (currentCell) {
            if (!event.repeat && event.key === KeyboardKeys.Shift) {

                event.stopImmediatePropagation();

                this.controller.abort();
                this.selectionFlag = true;
                this.selectionMode = SelectionModes.Text;
                this.addSelectedCell(currentCell);

            }
        }
    }

    private handleCellSelectionContinuationOnKeyDown(event: KeyboardEvent) {
        if (this.selectionFlag) {
            const target = event.target as HTMLElement;
            const currentCell = target.closest(DOMElements.TD) as HTMLTableCellElement;

            if (currentCell) {
                if (this.selectionMode == SelectionModes.Cell && event.shiftKey && event.key.startsWith('Arrow') && !event.repeat) {

                    event.stopImmediatePropagation();
                    event.preventDefault();

                    const table = currentCell.closest(DOMElements.TABLE)!;
                    const nextCell = TableUtils.getNeighborCell(table, currentCell, event.key as Directions);

                    this.addSelectedCell(currentCell);

                    if (nextCell) {
                        this.addSelectedCell(nextCell);
                    }
                }
            }
        }
    }

    normalizeText(text: string) {
        return text
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
    * Updates the selection mode by comparing the current text selection from the document
    * with the stored selected text. If the current selection matches the previously stored
    * selection, it switches the selection mode to cell selection and resets the selected text.
    * If there is a new selection (actualSelection is not empty), it updates the stored selected text
    * to reflect the current selection.
    *
    */
    private updateTheSelectionModeByCurrentSelectionState(event: KeyboardEvent): void {
        // Check if the selection flag is set, indicating that selection updates should be monitored

        if (this.selectionFlag) {
            // Get the current selection from the document
            const actualSelection = this.normalizeText(document.getSelection()?.toString().trim() || "");

            const target = event.target as HTMLElement;
            const currentCell = target.closest(DOMElements.TD) as HTMLTableCellElement;

            const currentCellText = this.normalizeText((currentCell.textContent || "").trim());

            let isTheEnd: boolean = false;

            if (actualSelection) {
                if (event.key == Directions.ArrowRight || event.key == Directions.ArrowDown) {
                    isTheEnd = currentCellText.endsWith(actualSelection) || false;
                } else {
                    isTheEnd = currentCellText.startsWith(actualSelection) || false;
                }
            }

            // Check if the current selection matches the stored selected text
            if ((actualSelection == this.selectedText.trim() && isTheEnd)) {
                // If they are the same, it indicates that the selection hasn't changed,
                // so switch to cell selection mode and reset the stored text
                this.selectionMode = SelectionModes.Cell;
                this.selectedText = "";
            } else if (actualSelection) {
                // If there is a new selection, update the stored selected text to the new value
                this.selectedText = actualSelection;
            }
        }
    }

    /**
    * Updates the selection mode based on the current mouse position relative to the actual focused cell.
    * This function checks if the mouse is outside the bounds of the focused cell, and if so, switches the
    * selection mode to cell selection mode.
    * 
    * @param {MouseEvent} event - The mouse event that triggers this function, typically involving mouse movement.
    */
    private updateSelectionModeByMouseEvent(event: MouseEvent): void {

        if (this.selectionFlag && this.actualFocusedCell) {

            const cellRect = this.actualFocusedCell.getBoundingClientRect();

            const mouseX = event.clientX;
            const mouseY = event.clientY;

            if (!(mouseX >= cellRect.left && mouseX <= cellRect.right && mouseY >= cellRect.top && mouseY <= cellRect.bottom)) {
                this.selectionMode = SelectionModes.Cell;
            }
        }
    }

    private handleKeyUp(event: KeyboardEvent) {

        const target = event.target as HTMLElement;
        const currentCell = target.closest(DOMElements.TD) as HTMLTableCellElement;

        if (currentCell) {

            event.stopImmediatePropagation();

            this.updateTheSelectionModeByCurrentSelectionState(event);

            if (event.key === KeyboardKeys.Shift) {
                this.resetSelectionState();

                if (this.selectedCells.length > 0) {
                    this.show();
                }
            }
        }
    }

    private addSelectedCell(cell: HTMLTableCellElement) {
        if (this.selectedCells.length === 0) {
            this.selectedCells.push(cell);
            cell.classList.add('selected');

            //Change the actual focused cell only if at same table
            this.actualFocusedCell = cell;
            cell.focus();
            return;
        } else {
            const lastSelectedCell = this.selectedCells[this.selectedCells.length - 1];
            const lastSelectedCellTable = lastSelectedCell.closest('table');
            const currentCellTable = cell.closest('table');

            if (lastSelectedCellTable === currentCellTable) {
                const index = this.selectedCells.indexOf(cell);
                if (index === -1) {
                    this.selectedCells.push(cell);
                    cell.classList.add('selected');

                    //Change the actual focused cell only if at same table
                    this.actualFocusedCell = cell;
                    cell.focus();
                }
            }
        }

    }

    show(): void {

        if (!this.actualFocusedCell) {
            console.error('No focused cell found');
            return;
        }

        this.resetAbortController();

        this.focusStack.push(this.actualFocusedCell);

        this.changeToolbarPositionToBeClosedTo(this.actualFocusedCell);

        super.show();

        this.actualFocusedCell.addEventListener(DefaultJSEvents.Blur, this.clearAndHide, { signal: this.controller.signal });
    }

    changeToolbarPositionToBeClosedTo(element: HTMLElement): void {
        const rect = element.getBoundingClientRect();

        this.htmlElement.style.display = 'flex';

        const elementWidth = this.htmlElement.offsetWidth;
        let leftPosition = rect.left + window.scrollX + 0;

        if (leftPosition + elementWidth > window.innerWidth) {
            leftPosition = window.innerWidth - elementWidth - 20;
        }

        const elementHeight = this.htmlElement.offsetHeight;
        let topPosition = rect.top + window.scrollY - elementHeight - 10;

        if (topPosition < 0) {
            topPosition = rect.bottom + window.scrollY + 10;
        }

        this.htmlElement.style.left = `${leftPosition}px`;
        this.htmlElement.style.top = `${topPosition}px`;
    }

    resetSelectionState(): void {
        this.selectionMode = SelectionModes.Text;
        this.selectionFlag = false;
        this.selectedText = "";
    }

    clearAll(): void {
        this.actualFocusedCell = null;
        const allTableCells = document.querySelectorAll('td');
        allTableCells.forEach(cell => cell.classList.remove('selected'));
        this.selectedCells = [];
    }

    hide(): void {
        if (this.canHide) {
            super.hide();
        }
    }

    clearAndHide(): void {
        this.clearAll();
        this.hide();
    }

    private resetAbortController(): void {
        this.controller = new AbortController();
    }

    static getInstance() {
        const focusStack = DependencyContainer.Instance.resolve<IFocusStack>("IFocusStack");
        return new TableContextFloatingToolbar(focusStack);
    }
}