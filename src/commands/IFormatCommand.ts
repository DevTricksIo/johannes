interface IFormatCommand {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikeThrough: boolean;
    hiliteColor: { [color: string]: boolean };
    foreColor: { [color: string]: boolean };
    cellHiliteColor: { [color: string]: boolean };
}