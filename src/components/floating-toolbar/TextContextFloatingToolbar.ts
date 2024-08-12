import { DOMUtils } from "@/utilities/DOMUtils";
import { FloatingToolbar } from "./FloatingToolbar";
import { ZIndex } from "@/common/ZIndex";
import { DefaultJSEvents } from "@/common/DefaultJSEvents";
import { EventEmitter } from "@/commands/EventEmitter";
import { ITextOperationsService } from "@/services/text-operations/ITextOperationsService";
import { DependencyContainer } from "@/core/DependencyContainer";
import { Colors } from "@/common/Colors";
import { ButtonIDs } from "@/core/ButtonIDs";

export class TextContextFloatingToolbar extends FloatingToolbar {

    private static id: string = "textFloatingToolbar";
    private static instance: TextContextFloatingToolbar;
    private textOperationsService: ITextOperationsService;
    private initialRect: DOMRect | null = null;

    private constructor(textOperationsService: ITextOperationsService) {

        if (TextContextFloatingToolbar.instance) {
            throw new Error("Use TextContextFloatingToolbar.getInstance() to get instance.");
        }

        super(TextContextFloatingToolbar.id);

        this.htmlElement.style.zIndex = ZIndex.VeryImportant;
        this.textOperationsService = textOperationsService;

        this.attachEvents();
    }

    static getInstance(): TextContextFloatingToolbar {

        const textOperationsService = DependencyContainer.Instance.resolve<ITextOperationsService>("ITextOperationsService");;

        if (!TextContextFloatingToolbar.instance) {
            TextContextFloatingToolbar.instance = new TextContextFloatingToolbar(textOperationsService);
        }

        return TextContextFloatingToolbar.instance;
    }

    processSelectionChangeEffects() {

        //This block checks for an active selection and whether it contains any content.
        // In Firefox, the `selectionchange` event may be fired even while typing,
        // which is not the intended trigger since we only want to react to actual changes in selection.
        // If the selection is empty or null, the function returns early, effectively ignoring
        // these unwanted `selectionchange` events during typing.
        const selection = document.getSelection();
        if (!selection || selection?.toString().trim() === '') {
            return;
        }

        EventEmitter.emitResetActiveButtonsElementEvent("hiliteColor");
        EventEmitter.emitResetActiveButtonsElementEvent("foreColor");

        const isBold: boolean = this.textOperationsService.queryCommandStateA('bold');
        const isItalic: boolean = this.textOperationsService.queryCommandStateA('italic');
        const isUnderline: boolean = this.textOperationsService.queryCommandStateA('underline');
        const isStrikeThrough: boolean = this.textOperationsService.queryCommandStateA('strikeThrough');

        const hiliteColors: { [key: string]: boolean } = {};
        hiliteColors[Colors.HiliteColorRed] = this.textOperationsService.queryHiliteColor(Colors.HiliteColorRed);
        hiliteColors[Colors.HiliteColorGreen] = this.textOperationsService.queryHiliteColor(Colors.HiliteColorGreen);
        hiliteColors[Colors.HiliteColorBlue] = this.textOperationsService.queryHiliteColor(Colors.HiliteColorBlue);
        hiliteColors[Colors.HiliteColorYellow] = this.textOperationsService.queryHiliteColor(Colors.HiliteColorYellow);
        hiliteColors[Colors.HiliteColorGrey] = this.textOperationsService.queryHiliteColor(Colors.HiliteColorGrey);

        const foreColors: { [key: string]: boolean } = {};
        foreColors[Colors.ForeColorRed] = this.textOperationsService.queryForeColor(Colors.ForeColorRed);
        foreColors[Colors.ForeColorGreen] = this.textOperationsService.queryForeColor(Colors.ForeColorGreen);
        foreColors[Colors.ForeColorBlue] = this.textOperationsService.queryForeColor(Colors.ForeColorBlue);
        foreColors[Colors.ForeColorYellow] = this.textOperationsService.queryForeColor(Colors.ForeColorYellow);
        foreColors[Colors.ForeColorGrey] = this.textOperationsService.queryForeColor(Colors.ForeColorGrey);


        Object.entries(hiliteColors).forEach(([color, active]) => {
            if (active) {
                EventEmitter.emitShowHideActiveElementEvent("hiliteColor", color, "show");
            }
        });

        Object.entries(foreColors).forEach(([color, active]) => {
            if (active) {
                EventEmitter.emitShowHideActiveElementEvent("foreColor", color, "show");
            }
        });

        this.emitChangeComponentColorEvent(isBold, ButtonIDs.Bold);
        this.emitChangeComponentColorEvent(isItalic, ButtonIDs.Italic);
        this.emitChangeComponentColorEvent(isUnderline, ButtonIDs.Underline);
        this.emitChangeComponentColorEvent(isStrikeThrough, ButtonIDs.Strikethrough);
    }

    private emitChangeComponentColorEvent(active: boolean, targetId: string) {
        if (active) {
            EventEmitter.emitChangeComponentColorEvent(targetId, Colors.IconActiveBlue);
        } else {
            EventEmitter.emitChangeComponentColorEvent(targetId, Colors.IconDefaultBlack);
        }
    }

    attachEvents(): void {


        document.addEventListener(DefaultJSEvents.SelectionChange, this.processSelectionChangeEffects.bind(this));

        // document.addEventListener('keyup', (event) => {
        //     if (event.key === "Shift" || event.key === "Control") {

        //         if (window.getSelection()!.toString().trim() !== '') {

        //             if (DOMUtils.isSelectedTextDescendantOf(".title")) {
        //                 return;
        //             }

        //             event.preventDefault();
        //             event.stopPropagation();

        //             this.show();
        //         }
        //     }
        // });

        // document.addEventListener('mouseup', (event) => {
        //     if (!this.isVisible) {

        //         // wait the selection to be reflected in the DOM
        //         requestAnimationFrame(() => {

        //             if (window.getSelection()!.toString().trim() !== '') {

        //                 if (DOMUtils.isSelectedTextDescendantOf(".title")) {
        //                     return;
        //                 }

        //                 event.preventDefault();
        //                 event.stopPropagation();

        //                 this.show();
        //             }
        //         });
        //     }
        // });


        // document.addEventListener('onselection', (event) => {
        //     if (!this.isVisible) {

        //         // wait the selection to be reflected in the DOM
        //         requestAnimationFrame(() => {

        //             if (window.getSelection()!.toString().trim() !== '') {

        //                 if (DOMUtils.isSelectedTextDescendantOf(".title")) {
        //                     return;
        //                 }

        //                 event.preventDefault();
        //                 event.stopPropagation();

        //                 this.show();
        //             }
        //         });
        //     }
        // });

        let isSelecting = false;

        this.htmlElement.addEventListener("mouseup", (event) => { event.preventDefault(); });

        document.addEventListener("keydown", (event) => {
            if (event.shiftKey) {
                isSelecting = true;
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "Shift") {
                isSelecting = false;
                this.showHide(isSelecting);
            }
        });

        document.addEventListener('mousedown', () => {
            isSelecting = true;
        });

        document.addEventListener('mouseup', (event) => {
            isSelecting = false;
            this.showHide(isSelecting);
        });

        document.addEventListener(DefaultJSEvents.SelectionChange, () => {
            
            this.showHide(isSelecting);
        });


        document.addEventListener('keydown', (event) => {

            setTimeout(() => {
                if (this.canHide && (event.key === 'Escape')) {


                    if (this.anyDropdownVisible()) {
                        this.hideAllDropdownVisible();
                    } else {
                        this.hide();
                    }
                }
            }, 10);
        });

        super.attachEvents();
    }

    // showHide(isSelecting: boolean) {
    //     const hasContent = this.hasSelection();

    //     if (!hasContent) {
    //         this.hide();
    //     } else if (hasContent && !isSelecting) {
    //         this.show();
    //     }
    // }

    shouldUpdatePosition(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;

        const currentRect = selection.getRangeAt(0).getBoundingClientRect();
        if (!this.initialRect) return true;

        const positionChanged = Math.abs(currentRect.left - this.initialRect.left) > 10 || Math.abs(currentRect.top - this.initialRect.top) > 10;
        return positionChanged;
    }

    showHide(isSelecting: boolean) {

        //This block checks for an active selection and whether it contains any content.
        // In Firefox, the `selectionchange` event may be fired even while typing,
        // which is not the intended trigger since we only want to react to actual changes in selection.
        // If the selection is empty or null, the function returns early, effectively ignoring
        // these unwanted `selectionchange` events during typing.
        
        const hasContent = this.hasSelection();

        if (!hasContent) {
            this.hide();
            this.initialRect = null;
        } else if (hasContent && !isSelecting) {
            if (!this.isVisible) {
                this.show();
            } else if (this.shouldUpdatePosition()) {
                this.updatePosition();
            }
        }
    }

    hasSelection(): boolean {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const selectedText = selection.toString().trim();
            if (selectedText !== '') {
                return true;
            }
        }

        return false;
    }


    // showHide() {
    //     const selection = window.getSelection();
    //     if (selection && selection.rangeCount > 0) {
    //         const selectedText = selection.toString().trim();
    //         if (selectedText !== '') {
    //             alert("Selecionou: " + selectedText);

    //             this.show();
    //         } else {
    //             this.hide();
    //         }
    //     }
    // }


    changeToolbarPositionToBeClosedToSelection(): void {
        const selection = window.getSelection();
    
        if (!selection || selection.rangeCount === 0) {
            console.error('No selection found');
            return;
        }
    
        this.currentSelectionRange = selection.getRangeAt(0);
    
        const firstCharRange = this.currentSelectionRange.cloneRange();
        firstCharRange.collapse(true);
        const firstCharRect = firstCharRange.getBoundingClientRect();
    
        if (!this.initialRect) {
            this.initialRect = firstCharRect;
            this.htmlElement.style.display = 'flex';
        }
    
        const elementWidth = this.htmlElement.offsetWidth;
        let leftPosition = this.initialRect.left + window.scrollX - 50;
    
        if (leftPosition + elementWidth > window.innerWidth) {
            leftPosition = window.innerWidth - elementWidth - 20;
        }
    
        const elementHeight = this.htmlElement.offsetHeight;
        let topPosition = this.initialRect.top + window.scrollY - elementHeight - 10;
    
        if (topPosition < 0) {
            topPosition = this.initialRect.bottom + window.scrollY + 10;
        }
    
        this.htmlElement.style.left = `${leftPosition}px`;
        this.htmlElement.style.top = `${topPosition}px`;
    }

    show(): void {

        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            console.error('No selection found');
            return;
        }

        if(DOMUtils.findClosestAncestorOfActiveElementByClass("title")){
            return;
        };

        this.changeToolbarPositionToBeClosedToSelection();
        this.hideTurnIntoDropdownIfInCell();
        super.show();
    }

    hideTurnIntoDropdownIfInCell(): void {
        const isCell = DOMUtils.isSelectionInTableCell();

        this.dropdowns.forEach(dropdown => {
            if (dropdown.id == "turnIntoMenu") {
                if (isCell) {
                    dropdown.htmlElement.style.display = "none";
                } else {
                    dropdown.htmlElement.style.display = this.display;
                }
            }
        });

        this.separators.forEach(separator => {
            if (separator.id == "turnIntoSeparator") {
                if (isCell) {
                    separator.htmlElement.style.display = "none";
                } else {
                    separator.htmlElement.style.display = this.display;
                }
            }
        });
    }

    updatePosition(): void {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            this.setPosition(rect);
        }
    }

    setPosition(rect: DOMRect) {
        const elementWidth = this.htmlElement.offsetWidth;
        let leftPosition = rect.left + window.scrollX - 50;

        if (leftPosition + elementWidth > window.innerWidth) {
            leftPosition = window.innerWidth - elementWidth - 20;
        }

        const elementHeight = this.htmlElement.offsetHeight;
        let topPosition = rect.top + window.scrollY - elementHeight - 10;

        if (topPosition < 0) {
            topPosition = rect.bottom + window.scrollY + 10;
        }

        this.htmlElement.style.left = `${leftPosition}px`;
        this.htmlElement.style.top = `${topPosition}px`;
    }

    hide(): void {
        if (this.canHide) {
            this.currentSelectionRange = null;
            super.hide();
        }
    }
}