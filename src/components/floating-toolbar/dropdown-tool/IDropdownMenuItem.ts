import { BaseUIComponent } from "@/components/common/BaseUIComponent";
import { SVGIcon } from "@/components/common/SVGIcon";

export interface IDropdownMenuItem extends BaseUIComponent {

    activeIcon?: SVGIcon;
    focus(): void;
    removeFocus(): void;
    emitCommandEvent(): void;
    attachOnFocus(func: () => void): void;
    attachOnLoseFocus(func: () => void): void;
    // resetActiveIcon(): void;
    // getLeftIconBackgroundColor(): string | null;
    // changeActiveIconToVisible(): void;
}