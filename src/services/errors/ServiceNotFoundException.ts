export class ServiceNotFoundException extends Error {
    constructor(serviceKey: string) {
        super(`Service not found: ${serviceKey}`);
        this.name = "ServiceNotFoundException";
    }
}