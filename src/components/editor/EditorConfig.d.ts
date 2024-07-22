export interface EditorConfig {
    enableFloatingToolbar: boolean;
    enableQuickMenu: boolean;
    enableAddBlock: boolean;
    includeHeader: boolean;
    includeFirstParagraph: boolean;
    enableTitle: boolean;
    title: string | undefined
}

declare global {
    interface Window {
        editorConfig?: EditorConfig;
    }
}