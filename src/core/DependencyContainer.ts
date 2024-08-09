export class DependencyContainer {
    private static instance: DependencyContainer = new DependencyContainer();
    private dependencies: { [key: string]: Function } = {};

    private constructor() {}

    public static get Instance(): DependencyContainer {
        return DependencyContainer.instance;
    }

    public register(key: string, constructor: Function): void {
        this.dependencies[key] = constructor;
    }

    public resolve<T>(key: string): T {
        if (!this.dependencies[key]) {
            throw new Error(`Dependency ${key} not found.`);
        }
        return this.dependencies[key]();
    }
}
