
import ServiceNotFoundException from "../../errors/ServiceNotFoundException";
import BlockOperationsService from "../block-operations/BlockOperationsService";
import TextOperationService from "../text-operations/TextOperationService";
import ServiceProvider from "./ServiceProvider";

describe('Service provider', () => {
    test('Create a ServiceProvider', () => {

        const result = ServiceProvider.getInstance();

        expect(result).toBeInstanceOf(ServiceProvider);
    });

    test('Register a service', () => {

        const sut = ServiceProvider.getInstance();

        const serviceToRegister = TextOperationService.getInstance();

        sut.register("ITextOperationService", serviceToRegister);

        const registeredService = sut.getInstanceOf("ITextOperationService");

        expect(registeredService).toEqual(registeredService);
    });

    test('Register multiples services', () => {

        const sut = ServiceProvider.getInstance();

        const textOperationService = TextOperationService.getInstance();
        const blockOperationService = BlockOperationsService.getInstance();

        sut.register("ITextOperationService", textOperationService);
        sut.register("IBlockOperationsService", blockOperationService);

        const textOperationRegisteredService = sut.getInstanceOf("ITextOperationService");
        const blockOperationRegisteredService = sut.getInstanceOf("IBlockOperationsService");

        expect(textOperationRegisteredService).toEqual(textOperationService);
        expect(blockOperationRegisteredService).toEqual(blockOperationService);
    });

    test("Request a service from an empty service provider", () => {

        const sut = ServiceProvider.getInstance();

        expect(() => sut.getInstanceOf("INonExistentService")).toThrow(ServiceNotFoundException);
    });
});