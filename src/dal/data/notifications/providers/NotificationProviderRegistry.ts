import {NotificationProvider, NotificationProviderRegistry, NotificationQueue} from "@notifications/core/contract";
import {NotificationChannel, NotificationRequest} from "@notifications/core/model";
import {inject, injectable, multiInject} from "inversify";
import {QueueFactory} from "@notifications/queue/QueueFactory";

@injectable()
export class ProviderRegistry implements NotificationProviderRegistry {
    private queues = new Map<NotificationChannel, NotificationQueue<NotificationRequest>>();
    private registry = new Map<NotificationChannel, NotificationProvider>();
    constructor(@multiInject('NotificationProvider')
                    providers: NotificationProvider[],
                @inject(QueueFactory) private queueFactory: QueueFactory) {
        providers.forEach((provider: NotificationProvider) => {
            this.registry.set(provider.getProviderChannel(), provider);
            this.queues.set(provider.getProviderChannel(),queueFactory.createQueue());
        })
    }
    getProvider(channel: NotificationChannel): NotificationProvider {
        const provider = this.registry.get(channel);
        if (!provider) {
            throw new Error(`No provider registered for channel: ${channel}`);
        }
        return provider;
    }
    getQueue(channel: NotificationChannel): NotificationQueue<NotificationRequest> {
        const queue = this.queues.get(channel);
        if (!queue) {
            throw new Error(`No queue registered for channel: ${channel}`);
        }
        return queue;
    }
}