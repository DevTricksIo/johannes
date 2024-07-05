import IElementFactoryService from "./IElementFactoryService";

interface ElementCreator {
    (content: string): HTMLElement;
}

class ElementFactoryService implements IElementFactoryService {

    private creators: { [type: string]: ElementCreator };

    constructor() {
        this.creators = {};

        this.register('p', ElementFactoryService.paragraphCreator());
        this.register('h1', ElementFactoryService.headingCreator(1));
        this.register('h2', ElementFactoryService.headingCreator(2));
        this.register('h3', ElementFactoryService.headingCreator(3));
        this.register('h4', ElementFactoryService.headingCreator(4));
        this.register('h5', ElementFactoryService.headingCreator(5));
        this.register('h6', ElementFactoryService.headingCreator(6));
    }

    register(type: string, creator: ElementCreator): void {
        this.creators[type] = creator;
    }

    create(type: string, content: string): HTMLElement {
        const creator = this.creators[type];

        if (!creator) {
            throw new TypeError(`No creator registered for type: ${type}`);
        }

        return creator(content);
    }

    static paragraphCreator(): ElementCreator {
        return content => {
            const p = document.createElement('p');
            p.innerText = content;

            p.contentEditable = "true";
            p.setAttribute('data-type', 'p');
            p.classList.add('johannes-content-element');
            p.classList.add('swittable');
            p.classList.add('focusable');
            p.classList.add('key-trigger');
            p.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

            return p;
        };
    }

    static headingCreator(level: number): ElementCreator {
        return content => {
            const h = document.createElement(`h${level}`);
            h.innerText = content;

            h.contentEditable = "true";
            h.setAttribute('data-type', `h${level}`);
            h.classList.add('johannes-content-element');
            h.classList.add('swittable');
            h.classList.add('focusable');
            h.classList.add('focus');
            h.classList.add('key-trigger');

            return h;
        };
    }
}

export default ElementFactoryService