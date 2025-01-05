import {NotificationProvider, IProviderRegistry, IProvider} from "@src/dal/data/core/shared/contract";
import {injectable, multiInject} from "inversify";

@injectable()
export class ProviderRegistry implements IProviderRegistry<IProvider> {
    private registry = new Map<string, IProvider>();
    constructor(@multiInject('NotificationProvider')
                    providers: NotificationProvider[]) {
        providers.forEach((provider: NotificationProvider) => {
            this.registry.set(provider.getId(), provider);
        })
    }
    getProvider(id: string): IProvider {
        const provider = this.registry.get(id);
        if (!provider) {
            throw new Error(`No provider registered for id: ${id}`);
        }
        return provider;
    }
}