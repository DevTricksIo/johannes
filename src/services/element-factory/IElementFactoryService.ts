export interface IElementFactoryService {
    create(type: string, content?: string): HTMLElement;
}

export default IElementFactoryService;