import { DOMUtils } from "@/utilities/DOMUtils";
import { FloatingToolbar } from "./FloatingToolbar";
import { ZIndex } from "@/common/ZIndex";
import { DefaultJSEvents } from "@/common/DefaultJSEvents";
import { EventEmitter } from "@/commands/EventEmitter";
import { ITextOperationsService } from "@/services/text-operations/ITextOperationsService";
import { DependencyContainer } from "@/core/DependencyContainer";
import { Colors } from "@/common/Colors";
import { ButtonIDs } from "@/core/ButtonIDs";
import { KeyboardKeys } from "@/common/KeyboardKeys";

export class TextContextFloatingToolbar extends FloatingToolbar {

    private static id: string = "textFloatingToolbar";
    private static instance: TextContextFloatingToolbar;
    private textOperationsService: ITextOperationsService;
    private initialRect: DOMRect | null = null;

    private lockedHide = false;
    debounceTimer: any = null;

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
        // const selection = document.getSelection();
        // if (!selection || selection.isCollapsed || selection.toString().trim.length == 0) {
        //     return;
        // }
        // const txt = selection.toString();
        // console.log(txt);

        setTimeout(() => {

            EventEmitter.emitResetActiveButtonsElementEvent("hiliteColor");
            EventEmitter.emitResetActiveButtonsElementEvent("foreColor");

            const isLink: boolean = this.textOperationsService.queryCommandState('createLink');
            const isBold: boolean = this.textOperationsService.queryCommandState('bold');
            const isItalic: boolean = this.textOperationsService.queryCommandState('italic');
            const isUnderline: boolean = this.textOperationsService.queryCommandState('underline');
            const isInlineCode: boolean = this.textOperationsService.queryCommandState("inlineCode");
            const isStrikeThrough: boolean = this.textOperationsService.queryCommandState('strikeThrough');

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

            this.emitChangeComponentColorEvent(isLink, ButtonIDs.Link);
            this.emitChangeComponentColorEvent(isBold, ButtonIDs.Bold);
            this.emitChangeComponentColorEvent(isItalic, ButtonIDs.Italic);
            this.emitChangeComponentColorEvent(isInlineCode, ButtonIDs.InlineCode);
            this.emitChangeComponentColorEvent(isUnderline, ButtonIDs.Underline);
            this.emitChangeComponentColorEvent(isStrikeThrough, ButtonIDs.Strikethrough);
        }, 20);
    }

    private emitChangeComponentColorEvent(active: boolean, targetId: string) {
        if (active) {
            EventEmitter.emitChangeComponentColorEvent(targetId, Colors.IconActiveBlue);
        } else {
            EventEmitter.emitChangeComponentColorEvent(targetId, Colors.IconDefaultBlack);
        }
    }

    processAfterChange(event: Event) {
        const selection = document.getSelection();
        if (selection && !selection.isCollapsed) {

            this.processSelectionChangeEffects();
        }
    }

    attachEvents(): void {

        let isSelecting = false;
        let debounceTimer: any;

        this.htmlElement.addEventListener(DefaultJSEvents.Mouseup, (event) => { event.preventDefault(); });

        document.addEventListener(DefaultJSEvents.Mouseup, this.processAfterChange.bind(this));
        document.addEventListener(DefaultJSEvents.BblClick, this.processAfterChange.bind(this));
        document.addEventListener(DefaultJSEvents.SelectionChange, this.processAfterChange.bind(this));

        document.addEventListener(DefaultJSEvents.Keydown, (event) => {
            if (event.shiftKey) {
                isSelecting = true;
            }
        });

        document.addEventListener(DefaultJSEvents.Keyup, (event) => {
            if (event.key === KeyboardKeys.Shift) {
                isSelecting = false;
                this.showHide(event, isSelecting);
            }
        });

        document.addEventListener(DefaultJSEvents.Mousedown, () => {
            isSelecting = true;
        });

        document.addEventListener(DefaultJSEvents.Mouseup, (event) => {
            isSelecting = false;
            this.showHide(event, isSelecting);

            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                isSelecting = false;
                this.showHide(event, isSelecting);
            }, 100);
        });

        document.addEventListener(DefaultJSEvents.SelectionChange, (event) => {
            this.showHide(event, isSelecting);
        });


        document.addEventListener(DefaultJSEvents.Keydown, (event) => {
            setTimeout(() => {
                if (this.canHide && (event.key === KeyboardKeys.Escape) && !this.lockedHide) {


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

    shouldUpdatePosition(): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return false;

        const currentRect = selection.getRangeAt(0).getBoundingClientRect();
        if (!this.initialRect) return true;

        const positionChanged = Math.abs(currentRect.left - this.initialRect.left) > 10 || Math.abs(currentRect.top - this.initialRect.top) > 10;
        return positionChanged;
    }

    showHide(event: Event, isSelecting: boolean) {

        //This block checks for an active selection and whether it contains any content.
        // In Firefox, the `selectionchange` event may be fired even while typing,
        // which is not the intended trigger since we only want to react to actual changes in selection.
        // If the selection is empty or null, the function returns early, effectively ignoring
        // these unwanted `selectionchange` events during typing.

        const hasContent = this.hasSelection();

        if (!hasContent) {

            if (this.lockedHide) {
                return;
            }

            this.hide();
            this.initialRect = null;
            return;
        } else if (hasContent && !isSelecting) {
            if (!this.isVisible) {

                const ignoreFloatingToolbar = DOMUtils.isSelectedTextDescendantOf(".ignore-text-floating-toolbar") || DOMUtils.isSelectedTextDescendantOf(".gist");
                if (ignoreFloatingToolbar) {
                    return;
                }

                // event.stopImmediatePropagation();
                this.show();
            } else if (this.shouldUpdatePosition()) {

                const ignoreFloatingToolbar = DOMUtils.isSelectedTextDescendantOf(".gist") || DOMUtils.isSelectedTextDescendantOf(".gist");
                if (ignoreFloatingToolbar) {
                    return;
                }
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


    changeToolbarPositionToBeClosedToSelection(): void {
        const selection = window.getSelection();

        if (!selection || selection.rangeCount === 0) {
            console.error('No selection found');
            return;
        }

        this.currentSelectionRange = selection.getRangeAt(0);
        const rects = this.currentSelectionRange.getClientRects();

        if (rects.length === 0) {
            console.error('No rects found');
            return;
        }

        const firstRect = rects[0];

        const c_firstRectLeft = firstRect.left;
        const c_firstRectTop = firstRect.top;
        const c_firstRectBottom = firstRect.bottom;

        this.htmlElement.style.display = 'flex';

        const elementWidth = this.htmlElement.offsetWidth;
        let leftPosition = c_firstRectLeft + window.scrollX - 50;

        if (leftPosition + elementWidth > window.innerWidth) {
            leftPosition = window.innerWidth - elementWidth - 20;
        }

        const elementHeight = this.htmlElement.offsetHeight;
        let topPosition = c_firstRectTop + window.scrollY - elementHeight - 10;

        if (topPosition < 0) {
            topPosition = c_firstRectBottom + window.scrollY + 10;
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

        if (DOMUtils.findClosestAncestorOfActiveElementByClass("title")) {
            return;
        };

        this.changeToolbarPositionToBeClosedToSelection();
        this.hideTurnIntoDropdownIfInCell();
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

    lockHide(): void {
        this.lockedHide = true;
    }

    unlockHide(): void {
        this.lockedHide = false;
    }
}