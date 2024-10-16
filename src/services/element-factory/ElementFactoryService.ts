import { ContentTypes } from "@/common/ContentTypes";
import { IElementFactoryService } from "./IElementFactoryService";
import { Utils } from "@/utilities/Utils";
import { Icons } from "@/common/Icons";
import { ToolboxOptions } from "@/components/block-toolbox/ToolboxOptions";
import { CommonClasses } from "@/common/CommonClasses";

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
        IMAGE: "image",
        VIDEO: "video",
        SPOTIFY: "spotify",
        GITHUB_GIST: "github-gist",
        GITLAB_SNIPPET: "gitlab-snippet",
        CODEPEN: "codepen",
        CALLOUT: "callout",
        SEPARATOR: "separator"
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
        this.register(ElementFactoryService.ELEMENT_TYPES.IMAGE, ElementFactoryService.placeholderCreator(ContentTypes.Image, Icons.Image2, "Upload or embed an image", [CommonClasses.ShowMediaInputUpload, CommonClasses.ShowMediaInputEmbed, "image-embed-placeholder-text"]));
        this.register(ElementFactoryService.ELEMENT_TYPES.VIDEO, ElementFactoryService.placeholderCreator(ContentTypes.Iframe, Icons.YouTube, "Embed a YouTube video", [CommonClasses.ShowMediaInputEmbed, "youtube-embed-placeholder-text"]));
        this.register(ElementFactoryService.ELEMENT_TYPES.SPOTIFY, ElementFactoryService.placeholderCreator(ContentTypes.Iframe, Icons.Spotify, "Embed a Spotify audio track", [CommonClasses.ShowMediaInputEmbed, "spotify-embed-placeholder-text"]));
        this.register(ElementFactoryService.ELEMENT_TYPES.GITHUB_GIST, ElementFactoryService.placeholderCreator(ContentTypes.Iframe, Icons.GitHub, "Embed a GitHub Gist", [CommonClasses.ShowMediaInputEmbed, "github-gist-embed-placeholder-text"]));
        this.register(ElementFactoryService.ELEMENT_TYPES.CODEPEN, ElementFactoryService.placeholderCreator(ContentTypes.Iframe, Icons.CodePen, "Embed a CodePen web demo", [CommonClasses.ShowMediaInputEmbed, "codepen-embed-placeholder-text"]));
        this.register(ElementFactoryService.ELEMENT_TYPES.CALLOUT, ElementFactoryService.calloutCreator());
        this.register(ElementFactoryService.ELEMENT_TYPES.SEPARATOR, ElementFactoryService.separatorCreator());

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
            const container = document.createElement('div');
            container.classList.add("johannes-content-element", "ignore-events");

            const codeBlock = document.createElement("div");
            codeBlock.classList.add("code-block", "ignore-quick-menu", "ignore-text-floating-toolbar");

            const pre = document.createElement('pre');
            pre.classList.add(ToolboxOptions.IncludeBlockToolbarClass, ToolboxOptions.LanguageSelectionToolClass, ToolboxOptions.ExtraOptionsClass);

            const code = document.createElement('code');
            code.contentEditable = "true";
            code.setAttribute("data-placeholder", "/* Code snippet */");
            code.textContent = content || "";
            code.classList.add('johannes-code', "focusable", "hljs", "language-plaintext", "editable");
            code.setAttribute("spellCheck", "false");

            pre.appendChild(code);

            code.addEventListener("blur", () => {
                code.removeAttribute("data-highlighted");
                hljs.highlightElement(code);
            });

            codeBlock.appendChild(pre);
            container.appendChild(codeBlock);

            hljs.highlightElement(code);

            return container;
        };
    }

    private static quoteCreator(): ElementCreator {
        return content => {

            const contentElement = document.createElement("div");
            contentElement.classList.add("johannes-content-element", "swittable");

            const blockquote = document.createElement("blockquote");
            blockquote.classList.add("focusable", "editable");
            blockquote.textContent = content || "";
            blockquote.contentEditable = "true";
            blockquote.setAttribute("data-placeholder", ElementFactoryService.getRandomQuote());

            contentElement.appendChild(blockquote);
            
            return contentElement;
        };
    }

    static getRandomQuote(): string {
        const quotations = [
            "Talk is cheap. Show me the code. - Linus Torvalds",
            "Premature optimization is the root of all evil. - Donald Knuth",
            "The most dangerous phrase in the language is, 'We've always done it this way.' - Grace Hopper",
            "Simplicity is prerequisite for reliability. - Edsger W. Dijkstra",
            "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
            "First, solve the problem. Then, write the code. - John Johnson",
            "In programming, the hard part isn't solving problems, but deciding what problems to solve. - Paul Graham",
            "Code is like humor. When you have to explain it, it's bad. - Cory House",
            "Make it work, make it right, make it fast. - Kent Beck",
            "Before software can be reusable it first has to be usable. - Ralph Johnson"
        ];
    
        const index = Math.floor(Math.random() * quotations.length);    
        return quotations[index];
    }

    private static checkListCreator(): ElementCreator {
        return content => {
            const ul = document.createElement('ul');
            ul.classList.add("johannes-content-element", "swittable", "list", "checkbox-list");
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
            tableShell.classList.add("table-shell", "ignore-quick-menu");

            const tableController = document.createElement("div");
            tableController.classList.add("table-controller");

            const tableWrapper = document.createElement("div");
            tableWrapper.classList.add("table-wrapper");

            const table = document.createElement('table');
            table.classList.add("johannes-content-element", "swittable", "table", ToolboxOptions.IncludeBlockToolbarClass, ToolboxOptions.AlignToolClass, ToolboxOptions.ExtraOptionsClass, "hide-turninto", "hide-moreoptions");
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
                cell.classList.add("focusable", "editable");
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

    private static placeholderCreator(contentType: ContentTypes, icon: Icons, text: string, classes: string[] = []): ElementCreator {
        return content => {

            const contentElement = document.createElement('div');
            contentElement.classList.add(CommonClasses.ContentElement, "swittable", "no-selection", ToolboxOptions.IncludeBlockToolbarClass, ToolboxOptions.ExtraOptionsClass);
            contentElement.setAttribute("data-content-type", contentType);

            const placeholder = document.createElement('div');
            placeholder.classList.add("content-placeholder", CommonClasses.ShowMediaInputOnClick, ...classes);

            const placeholderIcon = this.createIcon(icon);

            const placeholderText = document.createElement("span");
            placeholderText.classList.add("no-selection");
            placeholderText.innerText = text;

            contentElement.appendChild(placeholder);
            placeholder.appendChild(placeholderIcon);
            placeholder.appendChild(placeholderText);

            return contentElement;
        };
    }

    private static calloutCreator(): ElementCreator {
        return content => {
            const johannesCallout = document.createElement('div');
            johannesCallout.classList.add("ignore-quick-menu", "callout", "johannes-content-element", "swittable", ToolboxOptions.IncludeBlockToolbarClass, ToolboxOptions.ColorToolClass, ToolboxOptions.ExtraOptionsClass);

            const calloutWrapper = document.createElement("div");
            calloutWrapper.classList.add("callout-background-grey", "callout-wrapper");
            
            const textArea = document.createElement('p');
            textArea.setAttribute("data-placeholder", "Type something...");
            textArea.contentEditable = "true";
            textArea.classList.add("callout-text", "editable", "focusable");
            
            calloutWrapper.appendChild(textArea);
            johannesCallout.appendChild(calloutWrapper);

            return johannesCallout;
        };
    }

    private static separatorCreator(): ElementCreator {
        return () => {
            const content = document.createElement("div");
            content.classList.add("johannes-content-element");

            const wrapper = document.createElement("div");
            wrapper.classList.add("separator-wrapper");

            const separator = document.createElement('hr');
            separator.classList.add('separator');
            wrapper.appendChild(separator);
            content.appendChild(wrapper);
            
            return content;
        };
    }

    static paragraph(content: string | null = null): HTMLElement {
        const p = document.createElement('p');

        p.innerText = content || "";
        p.contentEditable = "true";
        p.setAttribute('data-content-type', ContentTypes.Paragraph);
        p.classList.add("johannes-content-element", "swittable", "focusable", "key-trigger", "editable");
        p.setAttribute('data-placeholder', 'Start typing...');

        return p;
    }

    private static heading(level: number, content: string | null = null): HTMLElement {
        const h = document.createElement(`h${level}`);

        h.innerText = content || "";
        h.contentEditable = "true";
        h.setAttribute('data-content-type', `h${level}`);
        h.classList.add("johannes-content-element", "swittable", "focusable", "focus", "key-trigger", "editable");
        h.setAttribute('data-placeholder', `Heading ${level}`);

        return h;
    }

    static checkboxItem(content: string): HTMLElement {

        const id = Utils.generateUniqueId();

        let element = document.createElement('li');
        element.classList.add("deletable", "no-list-style", "list-item", "list-item-checkable", "hide-turninto");

        let checkbox = document.createElement('input');
        checkbox.id = id;
        checkbox.setAttribute('type', 'checkbox');

        let span = document.createElement('div');
        span.textContent = content;
        span.setAttribute('data-placeholder', 'To-do');
        span.contentEditable = "true";
        span.setAttribute("for", id);

        span.classList.add("focusable", "editable", "focus");

        element.appendChild(checkbox);
        element.appendChild(span);

        return element;
    }

    private static listItem_2(content: string | null = null): HTMLElement {

        let initialItem = document.createElement("li");

        initialItem.classList.add("deletable", "list-item", "hide-turninto");

        const div = document.createElement("div");

        div.classList.add("focusable", "editable", "focus", "key-trigger");
        div.contentEditable = "true";
        div.setAttribute('data-placeholder', 'Item');

        initialItem.appendChild(div);


        div.innerText = content || "";

        return initialItem;
    }


    static blockParagraph(content: string | null = null) {
        let newDiv = document.createElement('div');
        let newElement = ElementFactoryService.paragraph(content);
        
        newDiv.id = `b-${Utils.generateUniqueId()}`;
        newDiv.appendChild(newElement);
        newDiv.classList.add('block');
        newDiv.classList.add('deletable');

        return newDiv;
    }

    static dragHandleButton() {

        const dragHandlerWrapper = document.createElement("div");
        dragHandlerWrapper.classList.add("drag-handler-wrapper", CommonClasses.EditorOnly);

        let button = document.createElement('button');
        button.innerHTML = '<svg width="1.375rem" height="1.375rem" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

        button.classList.add(CommonClasses.EditorOnly, "drag-handler", "button-reset");
        button.draggable = true;


        dragHandlerWrapper.appendChild(button);

        return dragHandlerWrapper;
    }

    static createIcon(iconId: string) {

        let element = document.createElement('div');
        element.classList.add("icon-wrapper");
        element.innerHTML = `<svg width="1.375rem" height="1.375rem" fill="currentColor"><use href="#${iconId}"></use></svg>`;

        return element;
    }
}