interface ICommand {
    execCommand(): boolean;
    queryCommandState(): boolean;
}

export default ICommand;