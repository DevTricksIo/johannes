import { Colors } from "@/common/Colors";
import { TableScopes } from "./TableScopes";

export interface ITableOperationsService {
    execCellBackgroundColor(value: string): void;
    insertRowAbove(): void;
    insertRowBelow(table: HTMLElement | null): void;
    insertColumnLeft(): void;
    insertColumnRight(block: HTMLElement | null): void;
    showInsertLineElement(block: HTMLElement): void;
    showInsertColumnElement(block: HTMLElement): void;
    hideInsertRowElement(block: HTMLElement): void;
    hideInsertColumnElement(block: HTMLElement): void;
    removeColumn(): void;
    removeRow(): void;
    // isActiveCellBackgroundColor(value: string): boolean;

    changeTableBorderColor(scope: TableScopes, color: Colors): void;
    queryStateCellBackgroundColor(value: string): boolean;
    queryAllStateCellBackgroundColor(elements: HTMLTableCellElement[], color: Colors): boolean;
}