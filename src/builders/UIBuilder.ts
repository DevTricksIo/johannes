import { Editor } from "../components/editor/Editor";
import { ElementFactoryService } from "../services/element-factory/ElementFactoryService";
import { BlockOperationsService } from "../services/block-operations/BlockOperationsService";
import { ServiceProvider } from "../services/service-provider/ServiceProvider";
import { TextOperationService } from "../services/text-operations/TextOperationService";
import { QuickMenuBuilder } from "./QuickMenuBuilder";
import { FloatingToolbarBuilder } from "./FloatingToolbarBuilder";
import { FloatingToolbar } from "../components/floating-toolbar/FloatingToolbar";
import { QuickMenu } from "../components/quick-menu/QuickMenu";
import { AddBlock } from "../components/add-block/AddBlock";

export class UIBuilder {

    private static instance: UIBuilder;

    private editor: Editor;
    private addBlock: AddBlock;
    private floatingToolbar: FloatingToolbar;
    private quickMenu: QuickMenu;

    private constructor(

        editor: Editor,
        addBock: AddBlock,
        floatingToolbar: FloatingToolbar,
        quickMenu: QuickMenu) {

        if (UIBuilder.instance) {
            throw new Error();
        }

        this.editor = editor;
        this.addBlock = addBock;
        this.floatingToolbar = floatingToolbar;
        this.quickMenu = quickMenu;

        UIBuilder.instance = this;
    }

    static build(services?: Map<string, any>): UIBuilder {

        if (UIBuilder.instance) {
            return UIBuilder.instance;
        }

        const serviceProvider = ServiceProvider.getInstance();

        // Initializer all service before any component
        if (services) {
            serviceProvider.reset();
            serviceProvider.registerServices(services);
        } else {

            //Registering all available services
            serviceProvider.registerService("IBlockOperationsService", BlockOperationsService.getInstance());
            serviceProvider.registerService("IElementFactoryService", ElementFactoryService.getInstance());
            serviceProvider.registerService("ITextOperationService", TextOperationService.getInstance());
        }

        const editor = Editor.getInstance(serviceProvider.getInstanceOf("IElementFactoryService"), serviceProvider.getInstanceOf("IBlockOperationsService"));

        const addBlock = new AddBlock(serviceProvider.getInstanceOf("IBlockOperationsService"));
        const floatingToolbar = FloatingToolbarBuilder.build();
        const quickMenu = QuickMenuBuilder.build();

        const builder = new UIBuilder(editor, addBlock, floatingToolbar, quickMenu);

        return builder;
    }

    start(): Editor {

        // if (window.editorConfig?.enableTitle) {
        //     this.editor.htmlElement.appendChild(this.title.htmlElement);
        // }

        if (window.editorConfig?.enableAddBlock || true) {
            this.editor.htmlElement.appendChild(this.addBlock.htmlElement);
        }

        if (window.editorConfig?.enableFloatingToolbar || true) {
            this.editor.htmlElement.appendChild(this.floatingToolbar.htmlElement);
        }

        if (window.editorConfig?.enableQuickMenu || true) {
            this.editor.htmlElement.appendChild(this.quickMenu.htmlElement);
        }


        return this.editor;
    }
}