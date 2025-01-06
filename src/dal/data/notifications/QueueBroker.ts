import {injectable, inject, multiInject} from "inversify";
import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {QueueFactory} from "@src/dal/data/core/queue/QueueFactory";
import {NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {QueuePool} from "@src/dal/data/core/queue/QueuePool";
import {RateLimitCache} from "@src/dal/domain/storage/RateLimitCache";

@injectable()
export class QueueBroker {
    constructor(@multiInject('NotificationProvider') providers: NotificationProvider[],
                @inject(QueuePool) private queuePool: QueuePool<NotificationRequest>,
                @inject(RateLimitCache) private rateLimitCache: RateLimitCache,
                @inject(QueueFactory) private queueFactory: QueueFactory<NotificationRequest>) {

        providers.forEach((provider: NotificationProvider) => {
            const queue = queueFactory.create();
            queue.configure({
                maxRetries: 3,
            })
            this.queuePool.register(provider.getId(), queue);
        });
    }
    route(channel: NotificationChannel, message: NotificationRequest) {
        const queue = this.queuePool.getQueue(channel)
        if (queue) {
            return queue.enqueue(message, this.scheduleDueDate(channel));
        } else {
            console.error(`Queue not found for channel: ${channel}`);
        }
    }
    scheduleDueDate(channel: NotificationChannel): number {
        const retryRateLimit = this.rateLimitCache.getRateLimitReset(channel);
        if (retryRateLimit) {
            return retryRateLimit;
        }
        return Date.now();
    }
}