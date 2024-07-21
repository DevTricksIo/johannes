import { ElementFactoryService } from "../../services/element-factory/ElementFactoryService";
import { BaseUIComponent } from "../common/BaseUIComponent";
import { IElementFactoryService } from "../../services/element-factory/IElementFactoryService";
import { ServiceProvider } from "../../services/service-provider/ServiceProvider";

export class Editor extends BaseUIComponent {

    display: string;
    editorId: string = "johannesEditor";

    private readonly elementFactoryService: IElementFactoryService;

    private static instance: Editor;

    private constructor() {

        if (Editor.instance) {
            throw new Error("Use BlockOperationsService.getInstance() to get instance.");
        }

        const editorId = "johannesEditor";

        super({
            editorId: editorId
        });

        this.elementFactoryService = ServiceProvider.getInstance().getInstanceOf("IElementFactoryService");
        this.display = "block";
        this.attachEvents();

        Editor.instance = this;
    }

    init(): HTMLElement {

        const htmlElement = document.getElementById(this.props.editorId) || document.createElement("div");

        if (htmlElement) {
            htmlElement?.classList.add("johannes-editor");
        }

        return htmlElement;
    }

    static getInstance() {

        if (!Editor.instance) {
            Editor.instance = new Editor();
        }

        return Editor.instance;
    }

    attachEvents() {

        const container = document.getElementById(this.editorId);

        container?.addEventListener('mouseover', (event) => {

            const element = (event.target as HTMLElement);

            if (element.closest('.block')) {
                this.appendDragHandler(element);
            }
        });


        //Focus on the first paragraph
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                const firstParagraph = document.querySelector("#johannesEditor > .content .block p") as HTMLElement;
                if (firstParagraph) {
                    firstParagraph.focus();
                }
            });
        } else {
            const firstParagraph = document.querySelector("#johannesEditor > .content .block p") as HTMLElement;
            if (firstParagraph) {
                firstParagraph.focus();
            }
        }
    }

    appendDragHandler(element: HTMLElement): void {
        const parent = element.closest('.block');
        let dragHandler = parent?.querySelector(".drag-handler");

        if (!dragHandler && parent) {
            dragHandler = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.DRAG_HANDLE_BUTTON);
            parent.prepend(dragHandler);
        }
    }

    removeDragHandler(element: HTMLElement): void {
        const parent = element.closest('.block');

        if (parent) {
            const dragHandler = parent.querySelector(".drag-handler");
            dragHandler?.remove();
        }
    }

    extractContent() {
        throw new Error("Not implemented Exception");
    }
}