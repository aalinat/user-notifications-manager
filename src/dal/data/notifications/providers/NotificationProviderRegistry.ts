import {NotificationProvider, NotificationProviderRegistry, NotificationQueue} from "@notifications/core/contract";
import {NotificationChannel, NotificationRequest} from "@notifications/core/model";
import {inject, injectable, multiInject} from "inversify";
import {QueueFactory} from "@notifications/queue/QueueFactory";
import {NotificationConsumer} from "@notifications/queue/NotificationConsumer";
import {ConsumerFactory} from "@notifications/queue/ConsumerFactory";

@injectable()
export class ProviderRegistry implements NotificationProviderRegistry {
    private queues = new Map<NotificationChannel, NotificationQueue<NotificationRequest>>();
    private consumers = new Map<NotificationChannel, NotificationConsumer>();
    private registry = new Map<NotificationChannel, NotificationProvider>();
    constructor(@multiInject('NotificationProvider')
                    providers: NotificationProvider[],
                @inject(QueueFactory) private queueFactory: QueueFactory,
                @inject(ConsumerFactory) private consumerFactory: ConsumerFactory) {
        providers.forEach((provider: NotificationProvider) => {
            this.registry.set(provider.getProviderChannel(), provider);
            const queue = queueFactory.createQueue();
            queue.configure({
                maxRetries: 3,
            })
            this.queues.set(provider.getProviderChannel(),queue);
            const consumer = consumerFactory.createConsumer(provider, provider.getProviderChannel(), queue);
            this.consumers.set(provider.getProviderChannel(), consumer);
            consumer.startPolling(1000)
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