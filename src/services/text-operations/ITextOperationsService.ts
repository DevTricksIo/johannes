import { ICommand } from "../../commands/ICommand";

export interface ITextOperationsService extends ICommand {

    queryHiliteColor(expectedColor: string): boolean;
    queryForeColor(expectedColor: string): boolean;

    execBold(): void;
    execItalic(): void;
    execStrikeThrough(): void;
    execUnderline(): void 
    execHiliteColor(value: string): void;
    execForeColor(value: string): void;


    queryCommandStateA(command: string, value?: string | null): boolean
}