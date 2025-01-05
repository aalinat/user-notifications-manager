import {NotificationQueue} from "@notifications/core/contract";
import {NotificationRequest, QueueConfig, QueueMessage} from "@notifications/core/model";
import {injectable} from "inversify";

@injectable()
export class InMemoryNotificationQueue implements NotificationQueue<NotificationRequest> {
    acknowledge(messageId: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    configure(config: QueueConfig): void {
    }

    dequeue(): Promise<QueueMessage<NotificationRequest> | null> {
        return Promise.resolve(null);
    }

    enqueue(message: NotificationRequest): Promise<string> {
        console.log("message enqueued: " + message)
        return Promise.resolve("12312312");
    }

    getQueueSize(): Promise<number> {
        return Promise.resolve(0);
    }

    reject(messageId: string, requeue: boolean): Promise<void> {
        return Promise.resolve(undefined);
    }

}