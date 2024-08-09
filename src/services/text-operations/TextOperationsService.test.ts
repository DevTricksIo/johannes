import { TextOperationsService } from "./TextOperationsService"

describe("textOperationService", () => {
    test("getInstance with success", () => {

        const textOperationService = TextOperationsService.getInstance();

        expect(textOperationService).toBeInstanceOf(TextOperationsService);
    });
});