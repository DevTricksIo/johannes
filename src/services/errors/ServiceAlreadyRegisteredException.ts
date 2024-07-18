class ServiceAlreadyRegisteredException extends Error {
    constructor(serviceKey: string) {
        super(`Service already registered: ${serviceKey}`);
        this.name = "ServiceAlreadyRegisteredException";
    }
}

export default ServiceAlreadyRegisteredException;