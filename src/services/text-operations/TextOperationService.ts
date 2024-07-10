import ITextOperationService from "./ITextOperationService";

class TextOperationService implements ITextOperationService {

    queryCommandState(commandId: string): boolean {
        return document.queryCommandState(commandId);
    }

    execCommand(command: string, showUI: boolean | undefined = false, value?: string | undefined): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            throw new Error("No selection available.");
        }

        const range = selection.getRangeAt(0);
        const commandTag = this.getTag(command);
        if (!commandTag) {
            throw new Error("Invalid command specified.");
        }

        // Manage toggling based on the full range of current formatting
        const formattedAncestor = this.findFormattedAncestor(range, commandTag);
        if (formattedAncestor && range.toString() === formattedAncestor.textContent) {
            this.toggleFormatting(range, commandTag, true);
        } else {
            this.toggleFormatting(range, commandTag, false);
        }

        document.body.normalize();
        return true;
    }


    getTag(command: string): string | null {
        switch (command) {
            case 'bold':
                return 'strong';
            case 'italic':
                return 'em';
            case 'strikethrough':
                return 's';
            case 'underline':
                return 'u';
            case 'code':
                return 'code';
            case 'math':
                return 'span';
            case 'color':
                return 'span';
            case 'background':
                return 'span';
            default:
                throw new Error(`Unsupported command: ${command}`);
        }
    }

    findFormattedAncestor(range: Range, tag: string): HTMLElement | null {
        let node: Node | null = range.commonAncestorContainer;
        while (node && node !== document) {
            if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === tag) {
                return node as HTMLElement;
            }
            node = node.parentNode;
        }
        return null;
    }

    toggleFormatting(range: Range, tag: string, remove: boolean) {
        if (remove) {
            this.removeFormatting(range, tag);
        } else {
            // Determina se a formatação deve ser adicionada ou removida em partes da seleção
            const affectedElements = this.collectAffectedElements(range, tag);

            if (affectedElements.some(e => e.isFormatted && e.intersects)) {
                // Se alguma parte formatada intersecta, desformatar essa região
                affectedElements.forEach(el => {
                    if (el.isFormatted && el.intersects) {
                        this.removeInnerFormattingFromNode(el.element, range, tag);
                    }
                });
            } else {
                // Se nenhuma parte formatada intersecta, formatar a seleção
                const fragment = range.extractContents();
                const container = document.createElement(tag);
                container.appendChild(fragment);
                range.insertNode(container);
                range.selectNode(container);
            }
        }
    }

    collectAffectedElements(range: Range, tag: string): { element: Element, isFormatted: boolean, intersects: boolean }[] {
        let elements = Array.from(document.getElementsByTagName('*'));
        return elements.map(element => ({
            element: element,
            isFormatted: element.nodeName.toLowerCase() === tag,
            intersects: range.intersectsNode(element) && (element.textContent || '').trim() !== ''
        })).filter(e => e.intersects);
    }

    removeInnerFormattingFromNode(element: Element, range: Range, tag: string) {
        // Suponha uma função que lida com a remoção da formatação apenas dentro do range para um nó específico
        const textContent = element.textContent || '';
        const nodeRange = document.createRange();
        nodeRange.selectNodeContents(element);

        const startOffset = Math.max(0, range.startOffset - nodeRange.startOffset);
        const endOffset = Math.min(textContent.length, range.endOffset - nodeRange.startOffset);

        // Remove formatação apenas dentro do alcance especificado
        if (nodeRange.compareBoundaryPoints(Range.START_TO_END, range) > 0 && nodeRange.compareBoundaryPoints(Range.END_TO_START, range) < 0) {
            const before = document.createTextNode(textContent.slice(0, startOffset));
            const after = document.createTextNode(textContent.slice(endOffset));
            const parent = element.parentNode;
            if (parent && before.textContent) {
                parent.insertBefore(before, element);
            }
            if (parent && after.textContent) {
                parent.insertBefore(after, element.nextSibling);
            }

            if (parent) {
                parent.removeChild(element);
            }
        }
    }

    removeFormatting(range: Range, tag: string) {
        const elements = document.getElementsByTagName(tag);
        Array.from(elements).forEach(element => {
            const parent = element.parentNode;
            while (parent && element.firstChild) {
                parent.insertBefore(element.firstChild, element);
            }

            if (parent) {
                parent.removeChild(element);
            }
        });
    }

    isPartiallySelected(tag: string, range: Range): boolean {
        const ancestor = range.commonAncestorContainer;
        const elements = ((ancestor.nodeType === Node.ELEMENT_NODE ? ancestor : ancestor.parentElement) as HTMLElement).getElementsByTagName(tag);
        return Array.from(elements).some(element => {
            const elementRange = document.createRange();
            elementRange.selectNode(element);
            return range.intersectsNode(element) &&
                (range.compareBoundaryPoints(Range.START_TO_START, elementRange) < 0 ||
                    range.compareBoundaryPoints(Range.END_TO_END, elementRange) > 0);
        });
    }

    removeInnerFormatting(range: Range, tag: string) {
        const ancestor = range.commonAncestorContainer;
        const elements = ((ancestor.nodeType === Node.ELEMENT_NODE ? ancestor : ancestor.parentElement) as HTMLElement).getElementsByTagName(tag);
        Array.from(elements).forEach(element => {
            if (range.intersectsNode(element)) {
                const elementRange = document.createRange();
                elementRange.selectNode(element);
                const elementText = element.textContent || ""; // Garante que não seja nulo

                // Calcula os offsets corretos dentro do elemento
                if (range.compareBoundaryPoints(Range.END_TO_START, elementRange) < 0 && range.compareBoundaryPoints(Range.START_TO_END, elementRange) > 0) {
                    const startOffset = Math.max(0, range.startOffset - elementRange.startOffset);
                    const endOffset = Math.min(elementText.length, range.endOffset - elementRange.startOffset);

                    // Cria os nós de texto antes e depois, com o conteúdo adequado
                    const before = document.createTextNode(elementText.slice(0, startOffset));
                    const after = document.createTextNode(elementText.slice(endOffset));

                    // Remove o elemento formatado e insere o texto antes e depois
                    const parent = element.parentNode;
                    if (parent && before.textContent) {
                        parent.insertBefore(before, element);
                    }
                    if (parent && after.textContent) {
                        parent.insertBefore(after, element.nextSibling);
                    }

                    if (parent) {
                        parent.removeChild(element);
                    }
                }
            }
        });
    }


}

export default TextOperationService;