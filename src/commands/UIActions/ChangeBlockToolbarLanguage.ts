import { IUIAction } from "./IUIAction";

export class ChangeBlockToolbarLanguage implements IUIAction {

    language: string;
    blockId: string;
    constructor(blockId: string, language: string) {
        this.blockId = blockId;
        this.language = language;
    }
}