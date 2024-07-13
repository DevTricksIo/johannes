import ICommand from "../common/ICommand";

interface IBlockOperationsService extends ICommand {
    
    transformBlock(element: HTMLElement, contentTye: string): void;
}

export default IBlockOperationsService;