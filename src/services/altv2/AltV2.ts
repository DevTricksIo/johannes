export class AltV2 {

    constructor() {

    }

    static execCommand(commandId: string, showUI?: boolean, value?: any): boolean {
        switch (commandId.toLowerCase()) {
            case 'copy':
                return AltV2.execCopy();
            case 'cut':
                return AltV2.execCut();
            case 'createlink':
                return AltV2.execCreateLink(value);
            case 'unlink':
                return AltV2.execUnlink();
            case 'bold':
                return AltV2.execFormat('bold');
            case 'italic':
                return AltV2.execFormat('italic');
            case 'strikethrough':
                return AltV2.execFormat('strikethrough');
            case 'underline':
                return AltV2.execFormat('underline');
            case 'hilitecolor':
                return AltV2.execHiliteColor(value);
            case 'forecolor':
                return AltV2.execForeColor(value);
            case 'removeformat':
                return AltV2.execRemoveFormat();
            case 'inserttext':
                return AltV2.execInsertText(value);
            default:
                console.warn(`Comando '${commandId}' não é suportado.`);
                return false;
        }
    }

    static execCopy(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return false;
        try {
            navigator.clipboard.writeText(selection.toString());
            return true;
        } catch (err) {
            console.error('Falha ao copiar texto:', err);
            return false;
        }
    }

    static execCut(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return false;
        try {
            navigator.clipboard.writeText(selection.toString());
            const range = selection.getRangeAt(0);
            range.deleteContents();
            return true;
        } catch (err) {
            console.error('Falha ao cortar texto:', err);
            return false;
        }
    }

    static execCreateLink(url: string): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !url) return false;
        const range = selection.getRangeAt(0);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.appendChild(range.extractContents());
        range.insertNode(anchor);
        selection.removeAllRanges();
        selection.selectAllChildren(anchor);
        return true;
    }

    static execUnlink(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return false;
        const range = selection.getRangeAt(0);
        const contents = range.extractContents();
        const fragment = document.createDocumentFragment();

        contents.childNodes.forEach((node) => {
            if (node.nodeName.toLowerCase() === 'a') {
                while (node.firstChild) fragment.appendChild(node.firstChild);
            } else {
                fragment.appendChild(node);
            }
        });

        range.insertNode(fragment);
        return true;
    }

    static execFormat(command: string): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return false;
        const range = selection.getRangeAt(0);
        const tag = this.getTagForCommand(command);

        if (this.isSelectionFormatted(selection, tag)) {
            this.removeFormatFromSelection(selection, tag);
        } else {
            this.applyFormatToSelection(range, tag);
        }
        return true;
    }

    static getTagForCommand(command: string): string {
        const tags: { [key: string]: string } = {
            bold: 'b',
            italic: 'i',
            underline: 'u',
            strikethrough: 's',
        };
        return tags[command];
    }

    static isSelectionFormatted(selection: Selection, tag: string): boolean {
        const range = selection.getRangeAt(0);
        let container : Node | null = range.commonAncestorContainer;
        while (container) {
            if (container.nodeName.toLowerCase() === tag) return true;
            container = container.parentNode;
        }
        return false;
    }

    static removeFormatFromSelection(selection: Selection, tag: string): void {
        const range = selection.getRangeAt(0);
        const contents = range.extractContents();
        const fragment = document.createDocumentFragment();

        contents.childNodes.forEach((node) => {
            if (node.nodeName.toLowerCase() === tag) {
                while (node.firstChild) fragment.appendChild(node.firstChild);
            } else {
                fragment.appendChild(node);
            }
        });

        range.insertNode(fragment);
    }

    static applyFormatToSelection(range: Range, tag: string): void {
        const element = document.createElement(tag);
        element.appendChild(range.extractContents());
        range.insertNode(element);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(element);
        selection?.addRange(newRange);
    }

    static execHiliteColor(color: string): boolean {
        return this.execStyle('backgroundColor', color);
    }

    static execForeColor(color: string): boolean {
        return this.execStyle('color', color);
    }

    static execStyle(styleProp: string, value: string): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !value) return false;
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        (span.style as any)[styleProp] = value;
        span.appendChild(range.extractContents());
        range.insertNode(span);
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.addRange(newRange);
        return true;
    }

    static execRemoveFormat(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return false;
        const range = selection.getRangeAt(0);
        const contents = range.extractContents();
        const fragment = document.createDocumentFragment();

        contents.childNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const childNodes = (node as Element).childNodes;
                childNodes.forEach((child) => fragment.appendChild(child.cloneNode(true)));
            } else {
                fragment.appendChild(node.cloneNode(true));
            }
        });

        range.insertNode(fragment);
        return true;
    }

    static execInsertText(text: string): boolean {
        if (!text) return false;
        const selection = window.getSelection();
        if (!selection) return false;
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        return true;
    }
}