/**
 * Enum for CSS class names that activate specific functionalities in the BlockToolbox.
 * Each option corresponds to a class that, when applied, enables particular features 
 * related to content editing and styling within a block.
 *
 * @enum {string}
 */
export enum ToolboxOptions {
    /**
     * Class name that activates the block toolbar for content interaction.
     * This class includes the toolbar and enables basic interaction capabilities.
     */
    IncludeBlockToolbarClass = "include-block-toolbar", //block-toolbar, block-toolbar, content-interactive
    /**
     * Class name that activates the alignment tools within the toolbox.
     * This class enables functionalities for aligning the content within a block.
     */
    AlignToolClass = "align-tool", //interactive-align
    /**
     * Class name that enables color editing tools within the toolbox.
     * This class provides options for changing the color of text and background.
     */
    ColorToolClass = "color-tool", //interactive-color
    /**
     * Class name that activates additional options within the toolbox.
     * This class extends the toolbox with more advanced settings and functionalities, like Delete and Duplicate
     */
    ExtraOptionsClass = "extra-options", //interactive-more
    LanguageSelectionToolClass = "language-selection-tool" //interactive-more
}