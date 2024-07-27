import { ServiceProvider } from "../../services/service-provider/ServiceProvider";
import { QuickMenu } from "./QuickMenu";
import { QuickMenuSection } from "./QuickMenuSection"
import { TextOperationService } from "../../services/text-operations/TextOperationService";
import { BlockOperationsService } from "../../services/block-operations/BlockOperationsService";
import { ElementFactoryService } from "../../services/element-factory/ElementFactoryService";

describe("QuickMenuSection", () => {

    ServiceProvider.getInstance().registerService("ITextOperationService", TextOperationService.getInstance());
    ServiceProvider.getInstance().registerService("IBlockOperationsService", BlockOperationsService.getInstance());
    ServiceProvider.getInstance().registerService("IElementFactoryService", ElementFactoryService.getInstance());

    test("Create instance with success", () => {

        const quickMenu = QuickMenu.getInstance();

        const quickMenuSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: "a", classList: "a" });

        expect(quickMenuSection).toBeInstanceOf(QuickMenuSection);
    });
});