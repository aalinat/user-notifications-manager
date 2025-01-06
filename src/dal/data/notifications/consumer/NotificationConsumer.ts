import {
    NotificationChannel,
    NotificationRequest,
    NotificationResponse, QueueMessage,
    RateLimitError
} from "@src/dal/data/core/shared/model";
import {MessageQueue, NotificationProvider} from "@src/dal/data/core/shared/contract";
import {RateLimitCache} from "@src/dal/domain/storage/RateLimitCache";

export class NotificationConsumer {
    private lastProcessedTime: number = 0;
    private processedCount: number = 0;
    constructor(private rateLimitCache: RateLimitCache, private provider: NotificationProvider, private channel: NotificationChannel, private queue: MessageQueue<NotificationRequest>) {
    }

    async handler(request: NotificationRequest): Promise<NotificationResponse> {
        console.log("handling message!");
        return this.provider.send(request)
    }
    async start(interval: number = 1000, rateLimit: number = 1, limitWindow: number = 1000): Promise<void> {
        setInterval(async () => {
            const now = Date.now();
            if (rateLimit && limitWindow) {
                if (now - this.lastProcessedTime > limitWindow) {
                    this.processedCount = 0;
                    this.lastProcessedTime = now;
                }

                if (this.processedCount >= rateLimit) {
                    return; // Skip processing until next window
                }
            }

            const message = await this.queue.dequeue();
            if (message) {
                const rateLimit = this.rateLimitCache.getRateLimitReset(message.payload.channel);
                if (rateLimit && message.dueTime < rateLimit) {
                    return this.reOffer(message, rateLimit)
                }
                if (message.dueTime >= Date.now()) {
                    return this.reOffer(message, message.dueTime);
                }
                try {
                    await this.handler(message.payload);
                    await this.queue.acknowledge(message.id);
                    this.processedCount++;
                } catch (error) {
                    if (error instanceof RateLimitError) {
                        this.rateLimitCache.set(message.payload.channel, error.retryLimitReset);
                       return this.reOffer(message, Date.now() + error.retryAfterMS);
                    }
                    console.error(`Error processing message: ${message.id}`, error);
                    await this.queue.reject(message.id, true);
                }
            }
        }, interval);
    }
    async reOffer(message: QueueMessage<NotificationRequest>, dueTime: number) {
        await this.queue.acknowledge(message.id);
        await this.queue.enqueue(message.payload, dueTime + this.getRandomNumber(100, 1000));
    }
    getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}