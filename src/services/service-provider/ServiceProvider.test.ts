
import ServiceNotFoundException from "../errors/ServiceNotFoundException";
import ServiceAlreadyRegisteredException from "../errors/ServiceAlreadyRegisteredException";
import BlockOperationsService from "../block-operations/BlockOperationsService";
import TextOperationService from "../text-operations/TextOperationService";
import ServiceProvider from "./ServiceProvider";

describe("Service getInstance functionality", () => {

    afterEach(() => {
        const sut = ServiceProvider.getInstance();
        sut.reset();
    });

    test('Create a ServiceProvider', () => {

        const result = ServiceProvider.getInstance();

        expect(result).toBeInstanceOf(ServiceProvider);
    });
});


describe('ServiceProvider register functionality', () => {

    afterEach(() => {
        const sut = ServiceProvider.getInstance();
        sut.reset();
    });

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

    test("Request a service from an empty service provider should throw", () => {

        const sut = ServiceProvider.getInstance();

        expect(() => sut.getInstanceOf("INonExistentService")).toThrow(ServiceNotFoundException);
    });

    test("Registering the same service twice should throw", () => {

        const sut = ServiceProvider.getInstance();

        const serviceInstance1 = TextOperationService.getInstance();
        const serviceInstance2 = BlockOperationsService.getInstance();

        sut.register("IAmazingService", serviceInstance1);

        expect(() => sut.register("IAmazingService", serviceInstance2)).toThrow(ServiceAlreadyRegisteredException);
    });
});

describe('ServiceProvider reset functionality', () => {
    let sut: ServiceProvider;

    beforeEach(() => {
        sut = ServiceProvider.getInstance();
        sut.reset();
    });

    test('Reset on an empty ServiceProvider should not throw', () => {
        expect(() => sut.reset()).not.toThrow();
    });

    test('Reset should clear all registered services in ServiceProvider', () => {
        const textOperationService = TextOperationService.getInstance();
        sut.register("ITextOperationService", textOperationService);

        expect(sut.getInstanceOf("ITextOperationService")).toBe(textOperationService);

        sut.reset();

        expect(() => sut.getInstanceOf("ITextOperationService")).toThrow(ServiceNotFoundException);
    });
});
