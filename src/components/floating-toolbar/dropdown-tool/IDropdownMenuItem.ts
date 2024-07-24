import { BaseUIComponent } from "@/components/common/BaseUIComponent";

export interface IDropdownMenuItem extends BaseUIComponent {

    focus(): void;
    removeFocus(): void;
    performAction(): void;
}