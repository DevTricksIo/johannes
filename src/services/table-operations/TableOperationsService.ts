import { TableUtils } from "@/utilities/TableUtils";
import { ITableOperationsService } from "./ITableOperationsService";
import { IFocusStack } from "@/core/IFocusStack";
import { DependencyContainer } from "@/core/DependencyContainer";
import { IMemento } from "@/core/IMemento";
import { Colors } from "@/common/Colors";
import { TableScopes } from "./TableScopes";
import { DOMElements } from "@/common/DOMElements";
import { EventEmitter } from "@/commands/EventEmitter";
import { DOMUtils } from "@/utilities/DOMUtils";
import { Utils } from "@/utilities/Utils";
import { TableContextFloatingToolbar } from "@/components/floating-toolbar/TableContextFloatingToolbar";
import { ToolbarIDs } from "@/core/ToolbarIDs";

export class TableOperationsService implements ITableOperationsService {

    private static instance: TableOperationsService;

    private focusStack: IFocusStack;
    private memento: IMemento;

    constructor(
        focusStack: IFocusStack,
        memento: IMemento) {
        if (TableOperationsService.instance) {
            throw new Error("Use TableOperationsService.getInstance() to get instance.");
        }

        this.focusStack = focusStack;
        this.memento = memento;
    }

    isActiveCellBackgroundColor(value: string): boolean {
        throw new Error("Method not implemented.");
    }

    removeColumn(): void {

        this.memento.saveState();

        const cell = this.focusStack.peek();

        if (cell) {
            TableUtils.removeColumnByCell(cell as HTMLTableCellElement);
        }

        EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);
    }

    removeRow(): void {
        this.memento.saveState();

        const cell = this.focusStack.peek();

        if (cell) {
            TableUtils.removeRowByCell(cell as HTMLTableCellElement);
        }

        EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);
    }


    execCellBackgroundColor(value: string): void {

        this.memento.saveState();

        EventEmitter.emitResetActiveButtonsElementEvent("backgroundColor");

        const activeCell = TableUtils.getActiveTableCell();

        if (activeCell) {
            const table = activeCell.closest('table')!;

            const selectedCells = table.querySelectorAll('td.selected');

            selectedCells.forEach(cell => {
                (cell as HTMLElement).style.backgroundColor = value;
            });

            EventEmitter.emitShowHideActiveElementEvent("backgroundColor", value, "show");

        } else {
            console.error("cell not found");
        }
    }



    static isCellBackgroundColor(cell: HTMLTableCellElement, targetHexColor: string): boolean {
        if (!cell || cell.tagName !== 'TD' || !cell.hasAttribute('data-placeholder')) {
            return false;
        }

        const computedStyle = window.getComputedStyle(cell);
        const currentBackgroundColor = computedStyle.getPropertyValue('background-color');

        const hexBackgroundColor = Utils.rgbToHex(currentBackgroundColor);

        return hexBackgroundColor.toUpperCase() === targetHexColor.toUpperCase();
    }

    queryStateCellBackgroundColor(value: string): boolean {

        const cell = TableUtils.getActiveTableCell();

        if (cell) {
            const computedStyle = window.getComputedStyle(cell);
            const currentBackgroundColor = computedStyle.getPropertyValue('background-color');

            const hexBackgroundColor = Utils.rgbToHex(currentBackgroundColor);

            return hexBackgroundColor.toUpperCase() === value.toUpperCase();
        }

        return false;

        // const a = DOMUtils.

        //     this.memento.saveState();

        // EventEmitter.emitResetActiveButtonsElementEvent("backgroundColor");

        // const activeCell = TableUtils.getActiveTableCell();

        // if (activeCell) {
        //     const table = activeCell.closest('table')!;

        //     const selectedCells = table.querySelectorAll('td.selected');

        //     selectedCells.forEach(cell => {
        //         (cell as HTMLElement).style.backgroundColor = value;
        //     });

        //     EventEmitter.emitShowHideActiveElementEvent("backgroundColor", value, "show");

        // } else {
        //     console.error("cell not found");
        // }
    }

    queryAllStateCellBackgroundColor(elements: HTMLTableCellElement[], color: Colors): boolean {

        let is: boolean = true;

        if (color == Colors.BackgroundColorNone) {
            return false;
        }

        elements.forEach(cell => {

            const style = window.getComputedStyle(cell);
            const rgbColor = style.backgroundColor;

            const hexColor = Utils.rgbToHex(rgbColor).toLocaleLowerCase();
            if (hexColor !== color.toLocaleLowerCase()) {
                is = false;
            }
        });

        return is;
    }


    // execHiliteColor(value: string): void {

    //     this.memento.saveState();

    //     if (document.execCommand("hiliteColor", false, value)) {
    //         EventEmitter.emitShowHideActiveElementEvent("hiliteColor", value, "show");
    //     }else{
    //         EventEmitter.emitShowHideActiveElementEvent("hiliteColor", value, "hide");
    //     }
    // }

    static getInstance(): TableOperationsService {

        const focusStack = DependencyContainer.Instance.resolve<IFocusStack>("IFocusStack");
        const memento = DependencyContainer.Instance.resolve<IMemento>("IMemento");

        if (!this.instance) {
            this.instance = new TableOperationsService(focusStack, memento);
        }

        return this.instance;
    }

    insertRowAbove(): void {
        this.memento.saveState();

        const cell = this.focusStack.peek(); // Agora, `cell` é a `td` diretamente
        if (!cell) {
            console.error("No cell is focused");
            return;
        }

        const row = cell.parentElement; // Obtem a linha (`tr`) pai da célula
        if (!row) {
            console.error("No row is focused");
            return;
        }

        const table = row.closest("table"); // Encontra a tabela que contém a linha
        if (!table) {
            console.error("Table does not exist");
            return;
        }

        const tbody = table.querySelector('tbody') || table; // Assume table se tbody não existir
        const rowIndex = Array.from(tbody.children).indexOf(row); // Encontra o índice da linha dentro do tbody ou da tabela

        if (rowIndex < 0) {
            console.error("Row index not found");
            return;
        }

        TableUtils.addRow(table, rowIndex); // Insere uma nova linha no índice encontrado
        EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);
    }

    insertRowBelow(block: HTMLElement): void {
        this.memento.saveState();

        if (block) {
            const table = block.querySelector("table");
            if (table) {
                const row = table.querySelector("tr:last-child");
                if (row) {
                    const rowIndex = Array.from(table.children[0].children).indexOf(row) + 1;
                    TableUtils.addRow(table, rowIndex);
                } else {
                    console.error("No rows in the table");
                    return;
                }
            } else {
                console.error("Table does not exist");
                return;
            }
        } else {
            const element = this.focusStack.peek();
            if (!element) {
                console.error("No focused element available");
                return;
            }

            const cell = element.closest("td");
            if (!cell) {
                console.error("No cell is focused");
                return;
            }

            const row = cell.parentElement;
            const table = cell.closest("table");
            if (!table) {
                console.error("Table does not exist");
                return;
            }

            if (row) {
                const rowIndex = Array.from(table.children[0].children).indexOf(row) + 1;
                TableUtils.addRow(table, rowIndex);

                EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);
            }

        }
    }

    // insertColumn(direction: 'left' | 'right'): void {
    //     this.memento.saveState();  // Salva o estado atual para possível desfazimento

    //     const element = this.focusStack.peek();  // Pega o elemento atualmente focado
    //     if (!element) {
    //         console.error("No focused element available");
    //         return;
    //     }

    //     const cell = element.closest("td");  // Encontra a célula focada dentro da tabela
    //     if (!cell) {
    //         console.error("No cell is focused");
    //         return;
    //     }

    //     const table = cell.closest("table");  // Encontra a tabela contendo a célula
    //     if (!table) {
    //         console.error("Table does not exist");
    //         return;
    //     }

    //     const columnIndex = Array.from(cell.parentElement.children).indexOf(cell);  // Determina o índice da coluna atual
    //     if (direction === 'left') {
    //         TableUtils.addColumn(table, columnIndex);  // Adiciona coluna à esquerda
    //     } else {
    //         TableUtils.addColumn(table, columnIndex + 1);  // Adiciona coluna à direita
    //     }
    // }

    insertColumnLeft(): void {
        this.memento.saveState();

        const element = this.focusStack.peek();
        if (!element) {
            console.error("No focused element available");
            return;
        }

        const cell = element.closest("td");
        if (!cell) {
            console.error("No cell is focused");
            return;
        }

        const table = cell.closest("table");
        if (!table) {
            console.error("Table does not exist");
            return;
        }

        const columnIndex = Array.from(cell.parentElement!.children).indexOf(cell);
        TableUtils.addColumn(table, columnIndex);

        EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);

    }

    insertColumnRight(block: HTMLElement | null): void {
        this.memento.saveState();

        if (block) {
            const table = block.querySelector("table");
            if (table) {
                TableUtils.addColumn(table);
            }
        } else {
            const element = this.focusStack.peek();
            if (!element) {
                console.error("No focused element available");
                return;
            }

            const cell = element.closest("td");
            if (!cell) {
                console.error("No cell is focused");
                return;
            }

            const table = cell.closest("table");
            if (!table) {
                console.error("Table does not exist");
                return;
            }

            const columnIndex = Array.from(cell.parentElement!.children).indexOf(cell);
            TableUtils.addColumn(table, columnIndex + 1);

            EventEmitter.emitCloseElementEvent(ToolbarIDs.TableToolbar);
        }
    }

    showInsertLineElement(block: HTMLElement): void {
        const insertLine = block.querySelector(".add-table-row") as HTMLElement;
        insertLine.style.visibility = "visible";
    }

    showInsertColumnElement(block: HTMLElement): void {
        const insertLine = block.querySelector(".add-table-column") as HTMLElement;
        insertLine.style.visibility = "visible";
    }

    hideInsertRowElement(block: HTMLElement): void {
        const insertLine = block.querySelector(".add-table-row") as HTMLElement;
        insertLine.style.visibility = "hidden";
    }

    hideInsertColumnElement(block: HTMLElement): void {
        const insertLine = block.querySelector(".add-table-column") as HTMLElement;
        insertLine.style.visibility = "hidden";
    }

    // isActiveCellBackgroundColor(value: string): boolean {
    //     return TableUtils.isActiveCellBackgroundColor(value);
    // }

    // emitChangeTableBorderColorEvent = (scope: TableScopes, color: Colors): void => {
    //     const customEvent = new CustomEvent(Commands., {
    //         detail: { scope: scope }
    //     });

    //     document.dispatchEvent(customEvent);
    // }


    changeTableBorderColor(scope: TableScopes, color: Colors): void {

        const table = this.focusStack.peek()?.closest(DOMElements.TABLE);

        if (table) {
            TableUtils.changeCellBorderColor(table, scope, color)
        }
    }

}