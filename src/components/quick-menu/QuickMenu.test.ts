import { ServiceProvider } from "../../services/service-provider/ServiceProvider";
import { QuickMenu } from "./QuickMenu"
import { TextOperationService } from "../../services/text-operations/TextOperationService";
import { BlockOperationsService } from "../../services/block-operations/BlockOperationsService";
import { ElementFactoryService } from "../../services/element-factory/ElementFactoryService";

describe("QuickMenu", () => {

    ServiceProvider.getInstance().registerService("ITextOperationService", TextOperationService.getInstance());
    ServiceProvider.getInstance().registerService("IBlockOperationsService", BlockOperationsService.getInstance());
    ServiceProvider.getInstance().registerService("IElementFactoryService", ElementFactoryService.getInstance());

    test("Create a new QuickMenu with success", () => {
        const quickMenu = QuickMenu.getInstance;

        expect(quickMenu).toBeInstanceOf(QuickMenu);
    });
});