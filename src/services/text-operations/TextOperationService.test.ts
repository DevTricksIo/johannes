import TextOperationService from "./TextOperationService"

describe("textOperationService", () => {
    test("getInstance with success", () => {

        const textOperationService = TextOperationService.getInstance();

        expect(textOperationService).toBeInstanceOf(TextOperationService);
    });
});