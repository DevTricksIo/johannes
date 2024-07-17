import ElementNotFoundError from "../../errors/ElementNotFoundError";
import FloatingToolbarBuilder from "../../builders/FloatingToolbarBuilder";
import QuickMenuBuilder from "../../builders/QuickMenuBuilder";
import AddBlock from "../add-block/AddBlock";
import BlockOperationsService from "../../services/block-operations/BlockOperationsService";
import ElementFactoryService from "../../services/element-factory/ElementFactoryService";
import IEditorConfig from "./IEditorConfig";

class Editor {

    editorId: string = "#johannesEditor";

    constructor(configuration: Partial<IEditorConfig> = {}) {

        const defaults: IEditorConfig = {
            enableFloatingToolbar: false,
            enableQuickMenu: false,
            enableAddBlock: false,
            includeHeader: false,
            includeFirstParagraph: false
        };

        const config = { ...defaults, ...configuration };

        const editor = document.getElementById(this.editorId);

        if (!editor) {
            throw new ElementNotFoundError(this.editorId);
        }

        editor.innerHTML = '';

        /* Dependencies */
        const elementFactoryService = new ElementFactoryService();
        const blockOperationsService = BlockOperationsService.getInstance(elementFactoryService);

        /* Main components */
        const quickMenu = QuickMenuBuilder.build(blockOperationsService);
        const floatingToolbar = FloatingToolbarBuilder.build();

        if (config.enableAddBlock) {
            const addBlock = new AddBlock();
            editor.appendChild(addBlock.htmlElement);
        }

        if (config.enableQuickMenu) {
            editor.appendChild(quickMenu.htmlElement);
        }

        if (config.enableFloatingToolbar) {
            editor.appendChild(floatingToolbar.htmlElement);
        }

    }
}

export default Editor;