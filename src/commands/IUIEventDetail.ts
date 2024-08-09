import { IUIAction } from "./UIActions/IUIAction";

export interface IUIEventDetail {
    targetId?: string;
    targetClass?: string;
    action: IUIAction,
}