import {
    NotificationChannel,
    NotificationRequest,
    NotificationResponse,
    RateLimitError
} from "@src/dal/data/core/shared/model";
import {MessageQueue, NotificationProvider} from "@src/dal/data/core/shared/contract";

export class NotificationConsumer {
    private lastProcessedTime: number = 0;
    private processedCount: number = 0;
    constructor(private provider: NotificationProvider, private channel: NotificationChannel, private queue: MessageQueue<NotificationRequest>) {
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
                try {
                    await this.handler(message.payload);
                    await this.queue.acknowledge(message.id);
                    this.processedCount++;
                } catch (error) {
                    if (error instanceof RateLimitError) {
                        await this.sleep(error.retryAfterMS);
                    }
                    console.error(`Error processing message: ${message.id}`, error);
                    await this.queue.reject(message.id, true);
                }
            }
        }, interval);
    }
    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}