import {inject, injectable} from "inversify";
import {NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {MessageQueue, NotificationProvider} from "@src/dal/data/core/shared/contract";
import {NotificationConsumer} from "@notifications/consumer/NotificationConsumer";
import {ProviderRegistry} from "@src/dal/data/core/providers/ProviderRegistry";
import {RateLimitCache} from "@src/dal/domain/storage/RateLimitCache";

@injectable()
export class NotificationConsumerFactory {
    constructor(@inject(ProviderRegistry) private providerRegistry: ProviderRegistry,
                @inject(RateLimitCache) private rateLimitCache: RateLimitCache) {
    }
    create(notificationChannel: NotificationChannel, queue: MessageQueue<NotificationRequest>) {
        const provider = this.providerRegistry.getProvider(notificationChannel) as NotificationProvider;
        return new NotificationConsumer(this.rateLimitCache, provider, notificationChannel, queue);

    }
}