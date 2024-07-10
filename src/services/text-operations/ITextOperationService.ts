interface ITextOperationService {


    execCommand(commandId: string, showUI?: boolean | undefined, value?: string | undefined): boolean;
    queryCommandState(commandId: string): boolean;
}

export default ITextOperationService;