import ServiceNotFoundException from "../errors/ServiceNotFoundException";

class ServiceProvider {

    private static instance: ServiceProvider;
    private services: Map<string, any> = new Map();

    private constructor() { }

    public static getInstance(): ServiceProvider {
        if (!ServiceProvider.instance) {
            ServiceProvider.instance = new ServiceProvider();
        }
        return ServiceProvider.instance;
    }

    public getInstanceOf<T>(key: string): T {
        const service = this.services.get(key);
        
        if (!service) {
            throw new ServiceNotFoundException(key);
        }
        return service as T;
    }

    public register<T>(key: string, instance: T): void {
        this.services.set(key, instance);
    }
}

export default ServiceProvider;