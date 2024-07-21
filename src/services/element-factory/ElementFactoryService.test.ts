import { ElementFactoryService } from "./ElementFactoryService"

describe("ElementFactoryService", () => {
    test("getInstance with Success", () => {
        const elementFactoryService = ElementFactoryService.getInstance();

        expect(elementFactoryService).toBeInstanceOf(ElementFactoryService);
    });
});