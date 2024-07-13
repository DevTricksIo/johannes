import ICommand from "../common/ICommand";

interface IBlockOperationsService extends ICommand {
    
    formatBlock(element: HTMLElement, contentTye: string): void;
}

export default IBlockOperationsService;