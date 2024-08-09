export interface ICommandEventDetail {
    command: string;
    value?: string | null;
    showUI?: boolean;
    targetBlockType?: string,
    block?: HTMLElement | null,
    scope?: string | null
}