import { Directions } from "@/common/Directions";
import { TableScopes } from "@/services/table-operations/TableScopes";

export class TableUtils {

    static addRow(table: HTMLTableElement, position: number | null = null): void {
        const insertPosition = (position !== null && position >= 0 && position <= table.rows.length) ? position : table.rows.length;
        const newRow = table.insertRow(insertPosition);

        const numColumns = Array.from(table.rows).reduce((max, row) => Math.max(max, row.cells.length), 0);
        let affectedCells = [];  // Array to hold references to new cells

        for (let i = 0; i < numColumns; i++) {
            const cell = newRow.insertCell();
            cell.contentEditable = "true";
            cell.setAttribute("data-placeholder", "Enter text");
            // cell.classList.add("temporary-shadow");
            affectedCells.push(cell);  // Add cell reference to array
        }

        setTimeout(() => {
            affectedCells.forEach(cell => cell.classList.remove("temporary-shadow"));
        }, 700);
    }

    static addColumn(table: HTMLTableElement, position: number | null = null): void {
        const insertPosition = position !== null ? position : undefined;
        let affectedCells = [];  // Array to hold references to new cells

        for (let i = 0; i < table.rows.length; i++) {
            const cell = table.rows[i].insertCell(insertPosition);
            cell.contentEditable = "true";
            cell.setAttribute("data-placeholder", "cell");
            // cell.classList.add("temporary-shadow");
            affectedCells.push(cell);  // Add cell reference to array
        }

        setTimeout(() => {
            affectedCells.forEach(cell => cell.classList.remove("temporary-shadow"));
        }, 700);
    }


    static isLastColumn(table: HTMLTableElement, cell: HTMLTableCellElement): boolean {
        if (!table.contains(cell)) {
            return false;
        }

        const cellRow = cell.parentElement as HTMLTableRowElement;
        const lastCellInRow = cellRow.cells[cellRow.cells.length - 1];
        return cell === lastCellInRow;
    }

    static isLastRow(table: HTMLTableElement, cell: HTMLTableCellElement): boolean {
        if (!table.contains(cell)) {
            return false;
        }

        const cellRow = cell.parentElement as HTMLTableRowElement;
        const lastRowInTable = table.rows[table.rows.length - 1];
        return cellRow === lastRowInTable;
    }

    static removeColumnByCell(cell: HTMLTableCellElement): void {
        if (cell.tagName.toLowerCase() !== "td" && cell.tagName.toLowerCase() !== "th") {
            throw new Error("The provided element is not a table cell.");
        }

        const row = cell.parentElement as HTMLTableRowElement;
        const table = row.parentElement as HTMLTableElement;
        const columnIndex = cell.cellIndex;

        // Add fade-out class to all cells in the column
        // for (let i = 0; i < table.rows.length; i++) {
        //     if (columnIndex < table.rows[i].cells.length) {
        //         table.rows[i].cells[columnIndex].classList.add("fade-out");
        //     }
        // }

        // Delay the column removal for 300 milliseconds

        for (let i = 0; i < table.rows.length; i++) {
            if (columnIndex < table.rows[i].cells.length) {
                table.rows[i].deleteCell(columnIndex);
            }
        }

        // setTimeout(() => {
        //     for (let i = 0; i < table.rows.length; i++) {
        //         if (columnIndex < table.rows[i].cells.length) {
        //             table.rows[i].deleteCell(columnIndex);
        //         }
        //     }
        // }, 900);
    }

    static removeRowByCell(cell: HTMLTableCellElement): void {
        if (cell.tagName.toLowerCase() !== "td" && cell.tagName.toLowerCase() !== "th") {
            throw new Error("The provided element is not a table cell.");
        }

        const row = cell.parentElement as HTMLTableRowElement;
        const table = row.parentElement as HTMLTableElement;

        // Add fade-out class to all cells in the row
        // Array.from(row.cells).forEach(cell => {
        //     cell.classList.add("fade-out");
        // });

        // Delay the row removal for 300 milliseconds

        table.deleteRow(row.rowIndex);

        // setTimeout(() => {
        //     table.deleteRow(row.rowIndex);
        // }, 900);
    }

    static getActiveTableCell(): HTMLTableCellElement | null {
        const activeElement = document.activeElement;

        if (activeElement?.tagName.toLowerCase() === 'td') {
            return activeElement as HTMLTableCellElement;
        }

        return activeElement?.closest('td') as HTMLTableCellElement || null;
    }


    // static isActiveCellBackgroundColor(targetHexColor: string): boolean {
    //     const activeCell = document.activeElement;

    //     if (!activeCell || activeCell.tagName !== 'TD' || !activeCell.hasAttribute('data-placeholder')) {
    //         return false;
    //     }

    //     const computedStyle = window.getComputedStyle(activeCell);
    //     const currentBackgroundColor = computedStyle.getPropertyValue('background-color');

    //     const hexBackgroundColor = Utils.rgbToHex(currentBackgroundColor);

    //     return hexBackgroundColor.toUpperCase() === targetHexColor.toUpperCase();
    // }


    static getLastTableCell(table: HTMLTableElement): HTMLElement | null {
        for (let i = table.rows.length - 1; i >= 0; i--) {
            const row = table.rows[i];
            for (let j = row.cells.length - 1; j >= 0; j--) {
                const cell = row.cells[j];
                if (cell.isContentEditable) return cell;
            }
        }
        return null;
    }

    static getFirstTableCell(table: HTMLTableElement): HTMLElement | null {
        for (let i = 0; i < table.rows.length; i++) {
            const row = table.rows[i];
            for (let j = 0; j < row.cells.length; j++) {
                const cell = row.cells[j];
                if (cell.isContentEditable) return cell;
            }
        }
        return null;
    }

    static getNeighborCell(table: HTMLTableElement, cell: HTMLTableCellElement, direction: Directions): HTMLTableCellElement | null {

        if (!cell.parentElement) {
            return null;
        }

        const rowIndex = (cell.parentElement as HTMLTableRowElement).rowIndex;
        const cellIndex = cell.cellIndex;

        switch (direction) {
            case Directions.ArrowRight:
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex + 1] ?? null;
            case Directions.ArrowLeft:
                return (cell.parentElement as HTMLTableRowElement).cells[cellIndex - 1] ?? null;
            case Directions.ArrowUp:
                return table.rows[rowIndex - 1]?.cells[cellIndex] ?? null;
            case Directions.ArrowDown:
                return table.rows[rowIndex + 1]?.cells[cellIndex] ?? null;
        }

        return null;
    }


    static changeCellBorderColor(
        table: HTMLTableElement,
        scope: TableScopes,
        color: string
    ) {
        let cellsToChange: NodeListOf<HTMLTableCellElement> | HTMLCollectionOf<HTMLTableCellElement> | null = null;

        switch (scope) {
            case TableScopes.Column:
                const columnIndex = (table.querySelector("td.selected") as HTMLTableCellElement)?.cellIndex;
                if (columnIndex !== undefined) {
                    cellsToChange = table.querySelectorAll(`td:nth-child(${columnIndex + 1})`);
                }
                break;
            case TableScopes.Row:
                const selectedCell = table.querySelector("td.selected") as HTMLTableCellElement;
                if (selectedCell) {
                    const row = selectedCell.parentElement as HTMLTableRowElement;
                    cellsToChange = row.cells;
                }
                break;
            case TableScopes.Cell:
                cellsToChange = table.querySelectorAll("td.selected") as NodeListOf<HTMLTableCellElement>;
                break;
            case TableScopes.SelectedCells:
                cellsToChange = table.querySelectorAll("td.selected") as NodeListOf<HTMLTableCellElement>;
                break;
            default:
                throw new Error("Invalid scope.");
        }

        if (cellsToChange) {



            Array.from(cellsToChange).forEach((cell) => {

                // cell.style.border = `1px double ${color}`;
                // const styles = window.getComputedStyle(cell);


                cell.style.border = `1px double ${color}`;
                // cell.style.boxShadow = `0 0 0 1px ${color} inset`;

                // const boxShadow = styles.getPropertyValue('box-shadow');
                // const border = styles.getPropertyValue('border');

                // console.log("bbb");
                // cell.style.border = border;
                // cell.style.boxShadow = boxShadow;

                // console.log('Box Shadow:', boxShadow);
                // console.log('Border:', border);

            });
        }
    }

}