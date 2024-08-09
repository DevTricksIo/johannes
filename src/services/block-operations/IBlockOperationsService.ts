import { ICommand } from "../../commands/ICommand";

export interface IBlockOperationsService extends ICommand {

    transformBlock(type: string, element?: HTMLElement | null): void;
    createNewElementAndSplitContent(): boolean;
}