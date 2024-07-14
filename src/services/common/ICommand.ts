interface ICommand {
    execCommand(command: string, value?: string | null): boolean;
    queryCommandState(command: string, value?: string | null): boolean;
}

export default ICommand;