import { ContentTypes } from "@/common/ContentTypes";
import { IElementFactoryService } from "./IElementFactoryService";
import { Utils } from "@/utilities/Utils";

interface ElementCreator {
    (content: string | null): HTMLElement;
}

export class ElementFactoryService implements IElementFactoryService {

    private creators: { [type: string]: ElementCreator };

    private static _instance: ElementFactoryService;

    static ELEMENT_TYPES = {
        BLOCK_PARAGRAPH: "block-p",
        PARAGRAPH: "p",
        CHECKBOX_ITEM: "checkboxItem",
        LIST_ITEM: "listItem",
        CODE: "code",
        QUOTE: "blockquote",
        BULLETED_LIST: "ul",
        NUMBERED_LIST: "ol",
        CHECK_LIST: "checkLists",
        HEADER_1: "h1",
        HEADER_2: "h2",
        HEADER_3: "h3",
        HEADER_4: "h4",
        HEADER_5: "h5",
        HEADER_6: "h6",
        DRAG_HANDLE_BUTTON: "drag-handle-button",
        TABLE: "table",
    }

    private constructor() {

        if (ElementFactoryService._instance) {
            throw new Error("Use ElementFactoryService.getInstance() to get instance.");
        }

        this.creators = {};

        this.register(ElementFactoryService.ELEMENT_TYPES.BLOCK_PARAGRAPH, ElementFactoryService.blockParagraphCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, ElementFactoryService.paragraphCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.CHECKBOX_ITEM, ElementFactoryService.checkboxItemCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.LIST_ITEM, ElementFactoryService.listItemCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.CODE, ElementFactoryService.codeCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.QUOTE, ElementFactoryService.quoteCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, ElementFactoryService.checkListCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST, ElementFactoryService.bulletedListCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST, ElementFactoryService.numberedListCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_1, ElementFactoryService.headingCreator(1));
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_2, ElementFactoryService.headingCreator(2));
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_3, ElementFactoryService.headingCreator(3));
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_4, ElementFactoryService.headingCreator(4));
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_5, ElementFactoryService.headingCreator(5));
        this.register(ElementFactoryService.ELEMENT_TYPES.HEADER_6, ElementFactoryService.headingCreator(6));
        this.register(ElementFactoryService.ELEMENT_TYPES.DRAG_HANDLE_BUTTON, ElementFactoryService.dragHandleButtonCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.TABLE, ElementFactoryService.tableCreator());



        ElementFactoryService._instance = this;
    }

    static getInstance(): ElementFactoryService {

        if (!this._instance) {
            this._instance = new ElementFactoryService();
        }

        return this._instance;
    }

    private register(type: string, creator: ElementCreator): void {
        this.creators[type] = creator;
    }

    create(type: string, content?: string): HTMLElement {
        const creator = this.creators[type];

        if (!creator) {
            throw new TypeError(`No creator registered for type: ${type}`);
        }

        return creator(content || "");
    }

    private static blockParagraphCreator(): ElementCreator {
        return content => {
            return ElementFactoryService.blockParagraph(content);
        };
    }

    private static paragraphCreator(): ElementCreator {
        return content => {
            return ElementFactoryService.paragraph(content);
        };
    }

    private static headingCreator(level: number): ElementCreator {
        return content => {
            return ElementFactoryService.heading(level, content);
        };
    }

    private static checkboxItemCreator(): ElementCreator {
        return content => {
            return ElementFactoryService.checkboxItem(content || "");
        };
    }

    private static listItemCreator(): ElementCreator {

        return content => {
            return ElementFactoryService.listItem_2(content);
        };
    }

    private static dragHandleButtonCreator(): ElementCreator {

        return () => {
            return ElementFactoryService.dragHandleButton();
        };
    }

    private static codeCreator(): ElementCreator {
        return content => {
            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.textContent = content || "";
            pre.appendChild(code);

            code.contentEditable = "true";
            pre.classList.add('johannes-content-element');
            code.classList.add('johannes-code');

            return pre;
        };
    }

    private static quoteCreator(): ElementCreator {
        return content => {
            const blockquote = document.createElement('blockquote');
            blockquote.textContent = content || "";
            blockquote.contentEditable = "true";
            blockquote.classList.add('johannes-content-element');
            return blockquote;
        };
    }

    private static checkListCreator(): ElementCreator {
        return content => {
            const ul = document.createElement('ul');
            // ul.contentEditable = "true";
            ul.classList.add('johannes-content-element');
            ul.classList.add('swittable');
            ul.classList.add('list');
            ul.classList.add('checkbox-list');
            ul.setAttribute("data-content-type", ContentTypes.CheckList);

            const initialItem = ElementFactoryService.checkboxItem(content || "");

            ul.appendChild(initialItem);

            return ul;
        };
    }

    private static bulletedListCreator(): ElementCreator {
        return content => {
            const element = document.createElement('ul');
            element.setAttribute("data-content-type", ContentTypes.BulletedList);
            element.classList.add('johannes-content-element');
            element.classList.add('swittable');
            element.classList.add('list');

            const initialItem = ElementFactoryService.listItem_2(content || "");

            element.appendChild(initialItem);

            return element;
        };
    }

    private static numberedListCreator(): ElementCreator {
        return content => {
            const element = document.createElement('ol');
            element.setAttribute("data-content-type", ContentTypes.NumberedList);
            element.classList.add('johannes-content-element');
            element.classList.add('swittable');
            element.classList.add('list');

            const initialItem = ElementFactoryService.listItem_2(content || "");

            element.appendChild(initialItem);

            return element;
        };
    }


    private static tableCreator(): ElementCreator {
        return content => {

            const tableShell = document.createElement("div");
            tableShell.classList.add("table-shell");

            const tableController = document.createElement("div");
            tableController.classList.add("table-controller");

            const tableWrapper = document.createElement("div");
            tableWrapper.classList.add("table-wrapper");

            const table = document.createElement('table');
            table.classList.add('johannes-content-element', 'swittable', 'table');
            table.setAttribute("data-content-type", ContentTypes.Table);

            tableShell.appendChild(tableController);
            tableController.appendChild(tableWrapper);
            tableWrapper.appendChild(table);

            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            const rowData = content ? content.split(',') : [];
            const row = document.createElement('tr');
            rowData.forEach(cellContent => {
                const cell = document.createElement('td');
                cell.classList.add("focusable");
                cell.setAttribute("data-placeholder", "cell");
                cell.textContent = cellContent;
                cell.contentEditable = 'true';
                row.appendChild(cell);
            });

            tbody.appendChild(row);

            const addRow = document.createElement("div");
            addRow.classList.add("add-table-row");
            addRow.innerHTML = `<svg width="1rem" height="1rem" fill="currentColor"><use xlink:href="#icon-plus"></use></svg>`;

            const addColumn = document.createElement("div");
            addColumn.classList.add("add-table-column");
            addColumn.innerHTML = `<svg width="1rem" height="1rem" fill="currentColor"><use xlink:href="#icon-plus"></use></svg>`;
    
            tableController.appendChild(addRow);
            tableController.appendChild(addColumn);

            return tableShell;
        };
    }

    // private static numberedListCreator(): ElementCreator {
    //     return () => {
    //         const ol = document.createElement('ol');
    //         ol.contentEditable = "true";
    //         ol.classList.add('johannes-content-element');
    //         return ol;
    //     };
    // }

    static paragraph(content: string | null = null): HTMLElement {
        const p = document.createElement('p');

        p.innerText = content || "";
        p.contentEditable = "true";
        p.setAttribute('data-content-type', ContentTypes.Paragraph);
        p.classList.add('johannes-content-element');
        p.classList.add('swittable');
        p.classList.add('focusable');
        p.classList.add('key-trigger');
        p.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

        return p;
    }

    private static heading(level: number, content: string | null = null): HTMLElement {
        const h = document.createElement(`h${level}`);

        h.innerText = content || "";
        h.contentEditable = "true";
        h.setAttribute('data-content-type', `h${level}`);
        h.classList.add('johannes-content-element');
        h.classList.add('swittable');
        h.classList.add('focusable');
        h.classList.add('focus');
        h.classList.add('key-trigger');
        h.setAttribute('data-placeholder', `Heading ${level}`);

        return h;
    }

    static checkboxItem(content: string): HTMLElement {

        const id = Utils.generateUniqueId();

        let element = document.createElement('li');
        element.classList.add('deletable');
        element.classList.add('list-item');
        element.classList.add('list-item-checkable');

        // initialItem.classList.add('key-trigger');

        let checkbox = document.createElement('input');
        checkbox.id = id;
        checkbox.setAttribute('type', 'checkbox');
        // checkbox.contentEditable = "true";

        let span = document.createElement('div');
        span.textContent = content;
        span.setAttribute('data-placeholder', 'To-do');
        span.contentEditable = "true";
        span.setAttribute("for", id);
        span.setAttribute("contentEditable", "true");

        span.classList.add('focusable');
        span.classList.add('editable');
        span.classList.add('focus');

        element.appendChild(checkbox);
        element.appendChild(span);

        return element;
    }

    // private static listItem(text: string): HTMLElement {

    //     let initialItem = document.createElement('li');

    //     initialItem.classList.add('focusable');
    //     initialItem.classList.add('deletable');
    //     initialItem.classList.add('editable');
    //     initialItem.classList.add('focus');
    //     initialItem.classList.add('key-trigger');
    //     initialItem.classList.add('list-item');

    //     initialItem.innerText = text;

    //     initialItem.contentEditable = "true";
    //     initialItem.setAttribute('data-placeholder', 'Item');

    //     return initialItem;

    // }

    private static listItem_2(content: string | null = null): HTMLElement {

        let initialItem = document.createElement('li');

        initialItem.classList.add('deletable');
        initialItem.classList.add('list-item');

        const div = document.createElement("div");

        div.classList.add('focusable');
        div.classList.add('editable');
        div.classList.add('focus');
        div.contentEditable = "true";
        div.classList.add('key-trigger');
        div.setAttribute('data-placeholder', 'Item');

        initialItem.appendChild(div);


        div.innerText = content || "";

        // initialItem.contentEditable = true;

        return initialItem;
    }


    static blockParagraph(content: string | null = null) {

        let newDiv = document.createElement('div');
        let newElement = ElementFactoryService.paragraph(content);

        // let dragHandler = document.createElement('button');
        // dragHandler.innerHTML = '<svg width="1.375rem" height="1.375rem" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

        // newDiv.appendChild(newButton);
        newDiv.appendChild(newElement);

        newDiv.classList.add('block');
        newDiv.classList.add('deletable');
        // dragHandler.classList.add('drag-handler');
        // dragHandler.classList.add('button-reset');
        // dragHandler.draggable = true;

        return newDiv;
    }

    static dragHandleButton() {

        let button = document.createElement('button');
        button.innerHTML = '<svg width="1.375rem" height="1.375rem" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

        button.classList.add('drag-handler');
        button.classList.add('button-reset');
        button.draggable = true;

        return button;
    }

}