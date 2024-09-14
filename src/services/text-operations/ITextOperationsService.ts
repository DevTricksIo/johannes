export interface ITextOperationsService {
    queryHiliteColor(expectedColor: string): boolean;
    queryForeColor(expectedColor: string): boolean;
    execToggleLink(): void;
    execInsertLink(url: string): void;
    execBold(): void;
    execItalic(): void;
    execStrikeThrough(): void;
    execInlineCode(): void;
    execUnderline(): void
    execHiliteColor(value: string): void;
    execForeColor(value: string): void;
    queryCommandState(command: string, value?: string | null): boolean
}