export interface ICommand {
    execCommand(command: string, showUI: boolean, value?: string | null): boolean;
    queryCommandState(command: string, value?: string | null): Promise<boolean>;
}