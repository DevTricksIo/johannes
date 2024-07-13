interface ITextOperationService {


    execCommand(command: string, showUI?: boolean | undefined, value?: string | undefined): boolean;
    execCommand2(): boolean;

    // queryCommandState(commandId: string): boolean;
    queryCommandState2(): boolean;
}

export default ITextOperationService;