import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";
import { Title } from "./Title";

describe("Title", () => {
    test("Create title", () => {
        const blockOperationsService = BlockOperationsService.getInstance();
        const title = new Title(blockOperationsService);
        expect(title).toBeInstanceOf(Title);
    });

    //TODO: Add test to check Enter
});