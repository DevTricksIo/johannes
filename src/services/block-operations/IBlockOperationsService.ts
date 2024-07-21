import { ICommand } from "../common/ICommand";

export interface IBlockOperationsService extends ICommand {

    formatBlock(element: HTMLElement, contentTye: string): void;
}