import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { ITableListeners } from "./ITableListeners";
import { CustomEvents } from "@/common/CustomEvents";
import { Commands } from "@/commands/Commands";
import { DOMUtils } from "@/utilities/DOMUtils";
import { TableUtils } from "@/utilities/TableUtils";
import { FocusStack } from "../FocusStack";
import { IFocusStack } from "../IFocusStack";
import { DependencyContainer } from "../DependencyContainer";

export class TableListeners implements ITableListeners {

    private static instance: TableListeners | null = null;

    focusStack: IFocusStack;

    shownElements = new Map<HTMLTableCellElement, HTMLElement>();

    private constructor(
        focusStack: IFocusStack) {

        if (TableListeners.instance) {
            throw new Error("Use TableEventListeners.getInstance() to get instance.");
        }

        this.focusStack = focusStack;

        this.listen();
    }

    startListen(): void {
        console.log("listening table clicks");
    }

    static getInstance(): TableListeners {

        const focusStack = DependencyContainer.Instance.resolve<IFocusStack>("IFocusStack");
        if (TableListeners.instance) {
            return TableListeners.instance;
        }

        return new TableListeners(focusStack);
    }

    private listen() {

        document.addEventListener("click", (event) => {
            let parent: Element | null = null;

            if ((event.target as Node).nodeType == Node.TEXT_NODE) {
                parent = (event.target as Node).parentElement;
            } else {
                parent = (event.target as Element);
            }

            if (parent?.closest(".add-table-column")) {

                const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.insertTableColumnRight,
                        block: parent.closest(".block") as HTMLElement
                    }
                });

                document.dispatchEvent(customEvent);
            }

            if (parent?.closest(".add-table-row")) {
                const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.insertTableRowBelow,
                        block: parent.closest(".block") as HTMLElement
                    }
                });

                document.dispatchEvent(customEvent);
            }
        });



        // document.addEventListener("mouseover", (event) => {
        //     const target = event.target as HTMLElement;

        //     // Ensure the target is a table cell (td) and a child of an element with class 'block'
        //     const cell = target.closest("td");
        //     if (!cell || !cell.closest(".block")) return; 

        //     // Get the associated table (assuming a table exists)
        //     const table = cell.closest("table") as HTMLTableElement;
        //     if (!table) return;

        //     // If an element is already shown for this cell, do nothing
        //     if (this.shownElements.has(cell)) return; // Prevent flickering

        //     // Check if in the last column and emit event
        //     if (TableUtils.isLastColumn(table, cell)) {
        //         const block = cell.closest(".block") as HTMLElement;
        //         const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
        //             detail: { command: Commands.showInsertTableColumnElement, block },
        //         });
        //         document.dispatchEvent(customEvent);
        //         this.shownElements.set(cell, block); // Track the shown element
        //     }

        //     // Check if in the last row and emit event
        //     if (TableUtils.isLastRow(table, cell)) {
        //         const block = cell.closest(".block") as HTMLElement;
        //         const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
        //             detail: { command: Commands.showInsertTableRowElement, block },
        //         });
        //         document.dispatchEvent(customEvent);
        //         this.shownElements.set(cell, block); // Track the shown element
        //     }
        // });

        // document.addEventListener("mouseout", (event) => {
        //     const target = event.target as HTMLElement;
        //     const relatedTarget = event.relatedTarget as HTMLElement;

        //     // Ensure the target is a table cell (td) and a child of an element with class 'block'
        //     const cell = target.closest("td");
        //     if (!cell || !cell.closest(".block")) return;

        //     // Get the associated table (assuming a table exists)
        //     const table = cell.closest("table") as HTMLTableElement;
        //     if (!table) return;

        //     // Check if the mouse is leaving the last column cell and not entering the add column button
        //     if (TableUtils.isLastColumn(table, cell) && !relatedTarget?.classList.contains("add-table-column")) {
        //         const shownElement = this.shownElements.get(cell);
        //         if (shownElement) {
        //             const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
        //                 detail: { command: Commands.hideInsertTableColumnElement, block: shownElement },
        //             });
        //             document.dispatchEvent(customEvent);
        //             this.shownElements.delete(cell);
        //         }
        //     }

        //     // Check if the mouse is leaving the last row cell and not entering the add row button
        //     if (TableUtils.isLastRow(table, cell) && !relatedTarget?.classList.contains("add-table-row")) {
        //         const shownElement = this.shownElements.get(cell);
        //         if (shownElement) {
        //             const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
        //                 detail: { command: Commands.hideInsertTableRowElement, block: shownElement },
        //             });
        //             document.dispatchEvent(customEvent);
        //             this.shownElements.delete(cell);
        //         }
        //     }
        // });
    }
}