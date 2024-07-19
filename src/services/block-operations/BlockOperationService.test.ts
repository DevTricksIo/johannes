import BlockOperationsService from "./BlockOperationsService"

describe("BlockOperationService", () => {
    test("getInstance with success", () => {

        const blockOperationService = BlockOperationsService.getInstance();

        expect(blockOperationService).toBeInstanceOf(BlockOperationsService);
    });
});