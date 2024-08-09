/**
 * Enum for specifying boundaries within an element.
 * @enum {string}
 */
export enum Boundaries {
    /** Represents the first line of an element, important for determining if the cursor is at the starting boundary. */
    First = "First",
    /** Represents the last line of an element, important for determining if the cursor is at the ending boundary. */
    Last = "Last"
}