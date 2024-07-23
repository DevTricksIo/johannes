
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { Content } from "./Content";
import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";

describe("Content", () => {
    test("Create element", () => {
        const elementFactoryService = ElementFactoryService.getInstance();
        const blockOperationsService = BlockOperationsService.getInstance();

        const content = new Content(elementFactoryService, blockOperationsService);

        expect(content).toBeInstanceOf(Content);
    });
});