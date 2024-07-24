import { ElementFactoryService } from "../../services/element-factory/ElementFactoryService";
import { BaseUIComponent } from "../common/BaseUIComponent";
import { IElementFactoryService } from "../../services/element-factory/IElementFactoryService";
import { Content } from "../content/Content";
import { Title } from "../title/Title";
import { IBlockOperationsService } from "@/services/block-operations/IBlockOperationsService";

export class Editor extends BaseUIComponent {

    private readonly elementFactoryService: IElementFactoryService;
    private static readonly editorId: string = "johannesEditor";
    private static instance: Editor;
    
    private title?: Title;
    private content?: Content;

    private constructor(
        elementFactoryService: IElementFactoryService, 
        blockOperationsService: IBlockOperationsService) {

        super({
            elementFactoryService: elementFactoryService,
            blockOperationsService: blockOperationsService
        });

        if (Editor.instance) {
            throw new Error("Use BlockOperationsService.getInstance() to get instance.");
        }

        this.elementFactoryService = elementFactoryService;

        this.attachEvents();

        Editor.instance = this;
    }

    init(): HTMLElement {

        const htmlElement = document.getElementById(Editor.editorId) || document.createElement("div");

        htmlElement.classList.add("johannes-editor");

        if (window.editorConfig?.enableTitle || true) {
            this.title = new Title(this.props.blockOperationsService);

            htmlElement.appendChild(this.title.htmlElement);
        }

        this.content = new Content(this.props.elementFactoryService, this.props.blockOperationsService);

        htmlElement.appendChild(this.content.htmlElement);

        // htmlElement.appendChild(this.props.content.htmlElement);

        return htmlElement;
    }

    static getInstance(elementFactoryService: IElementFactoryService, blockOperationsService: IBlockOperationsService) {

        if (!Editor.instance) {
            Editor.instance = new Editor(elementFactoryService, blockOperationsService);
        }

        return Editor.instance;
    }

    attachEvents() {

        const container = document.getElementById(Editor.editorId);

        container?.addEventListener('mouseover', (event) => {

            const target = event.target;
        
            if (target instanceof Node) {
                let element = target as Node;
        
                if (element.nodeType === Node.TEXT_NODE) {
                    element = element.parentElement as HTMLElement;
                }
        
                if (element instanceof Element) {
                    const blockElement = element.closest('.block');
                    
                    if (blockElement) {
                        this.appendDragHandler(blockElement);
                    }
                } else {
                    console.error('Event target is not an HTMLElement and cannot handle HTMLElement specific methods:', element);
                }
            } else {
                console.error('Event target is not a Node:', target);
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

    appendDragHandler(element: Node): void {
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode as HTMLElement;
        }
    
        if (!(element instanceof HTMLElement)) {
            console.error('Provided element is not an HTMLElement:', element);
            return;
        }
    
        const parent = element.closest('.block');
        let dragHandler = parent?.querySelector(".drag-handler");
    
        if (!dragHandler && parent) {
            dragHandler = this.elementFactoryService.create(ElementFactoryService.ELEMENT_TYPES.DRAG_HANDLE_BUTTON);
            parent.prepend(dragHandler);
        }
    }

    removeDragHandler(element: Node): void {
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode as HTMLElement;
        }
    
        if (!(element instanceof HTMLElement)) {
            console.error('Provided element is not an HTMLElement:', element);
            return;
        }
    
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