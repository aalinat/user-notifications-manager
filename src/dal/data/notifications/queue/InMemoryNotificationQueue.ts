import {NotificationQueue} from "@notifications/core/contract";
import {NotificationRequest, QueueConfig, QueueMessage} from "@notifications/core/model";
import {injectable} from "inversify";

@injectable()
export class InMemoryNotificationQueue implements NotificationQueue<NotificationRequest> {
    private queue: QueueMessage<NotificationRequest>[] = [];
    private processing: Map<string, QueueMessage<NotificationRequest>> = new Map();
    private config: QueueConfig = {};

    configure(config: QueueConfig): void {
        this.config = config;
    }

    async enqueue(message: NotificationRequest): Promise<string> {
        const id = this.generateId();
        const queueMessage: QueueMessage<NotificationRequest> = { id, payload: message, retries: 0, enqueueTime: Date.now() };
        this.queue.push(queueMessage);
        return id;
    }

    async dequeue(): Promise<QueueMessage<NotificationRequest> | null> {
        const message = this.queue.shift() || null;
        if (message) {
            message.retries++;
            this.processing.set(message.id, message);
        }
        return message;
    }

    async acknowledge(messageId: string): Promise<void> {
        this.processing.delete(messageId);
    }

    async reject(messageId: string, requeue: boolean): Promise<void> {
        const message = this.processing.get(messageId);
        if (message) {
            this.processing.delete(messageId);
            if (requeue) {
                if (!this.config.maxRetries || message.retries < this.config.maxRetries) {
                    this.queue.push(message);
                } else {
                    console.log("message is finally rejected, message: " + messageId);
                }
            }
        }
    }

    async getQueueSize(): Promise<number> {
        return this.queue.length;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(7);
    }

}