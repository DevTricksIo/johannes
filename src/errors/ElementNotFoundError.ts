class ElementNotFoundError extends Error {

    elementId: string;

    constructor(elementId: string) {
        super(`Failed to initialize because the required DOM element '${elementId}' was not found.`);
        this.name = "ElementNotFoundError";
        this.elementId = elementId;
    }
}

export default ElementNotFoundError;