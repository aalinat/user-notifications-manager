import {injectable} from "inversify";
import {NotificationChannel, NotificationRequest, NotificationResponse} from "@notifications/core/model";
import {NotificationProvider, NotificationQueue} from "@notifications/core/contract";

@injectable()
export class NotificationConsumer {
    constructor(private provider: NotificationProvider, private channel: NotificationChannel, private queue: NotificationQueue<NotificationRequest>) {
    }

    async handler(request: NotificationRequest): Promise<NotificationResponse> {
        console.log("handling message!");
        await this.provider.send(request)
        return new NotificationResponse();
    }
    async startPolling(interval: number = 1000): Promise<void> {
        setInterval(async () => {
            const message = await this.queue.dequeue();
            if (message) {
                try {
                    await this.handler(message.payload);
                    await this.queue.acknowledge(message.id);
                } catch (error) {
                    console.error(`Error processing message: ${message.id}`, error);
                    await this.queue.reject(message.id, true);
                }
            }
        }, interval);
    }
}