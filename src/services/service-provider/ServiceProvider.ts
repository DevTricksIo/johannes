import { ServiceNotFoundException } from "../errors/ServiceNotFoundException";

export class ServiceProvider {
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

    registerService<T>(key: string, instance: T): void {
        this.services.set(key, instance);
    }

    registerServices(services: Map<string, any>): void {
        services.forEach((instance, key) => {
            this.registerService(key, instance);
        });
    }

    reset(): void {
        this.services.clear();
    }
}