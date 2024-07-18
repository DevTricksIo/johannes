import ServiceAlreadyRegisteredException from "../errors/ServiceAlreadyRegisteredException";
import ServiceNotFoundException from "../errors/ServiceNotFoundException";

class ServiceProvider {
    private static instance: ServiceProvider;
    private services: Map<string, any> = new Map();

    private constructor() { }

    static getInstance(): ServiceProvider {
        if (!ServiceProvider.instance) {
            ServiceProvider.instance = new ServiceProvider();
        }
        return ServiceProvider.instance;
    }

    getInstanceOf<T>(key: string): T {
        const service = this.services.get(key);
        if (!service) {
            throw new ServiceNotFoundException(key);
        }
        return service as T;
    }

    register<T>(key: string, instance: T): void {
        if (this.services.has(key)) {
            throw new ServiceAlreadyRegisteredException(key);
        }
        this.services.set(key, instance);
    }

    reset(): void {
        this.services.clear();
    }
}

export default ServiceProvider;