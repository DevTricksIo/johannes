import ICommand from "../common/ICommand";

interface ITextOperationService extends ICommand {

    execCommand2(): boolean;
    queryCommandState2(): boolean;
}

export default ITextOperationService;