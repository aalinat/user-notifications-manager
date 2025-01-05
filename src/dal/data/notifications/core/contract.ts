import {
    NotificationChannel,
    NotificationRequest,
    NotificationResponse,
    QueueConfig,
    QueueMessage
} from "@notifications/core/model";


export interface NotificationProvider {
    send(notification: NotificationRequest): Promise<NotificationResponse>;
    getProviderName(): string;
    getProviderChannel(): NotificationChannel
}
export interface NotificationProviderRegistry {
    getProvider(channel: NotificationChannel): NotificationProvider;
    getQueue(channel: NotificationChannel): NotificationQueue<NotificationRequest>;
}

export interface NotificationQueue<T> {
    configure(config: QueueConfig): void;
    enqueue(message: T): Promise<string>;
    /**
     * Dequeue a message from the queue.
     * @returns The next message in the queue or null if empty.
     */
    dequeue(): Promise<QueueMessage<T> | null>;
    /**
     * Acknowledge successful message processing.
     * @param messageId - The ID of the processed message.
     */
    acknowledge(messageId: string): Promise<void>;

    /**
     * Reject and requeue or discard a message.
     * @param messageId - The ID of the rejected message.
     * @param requeue - Whether to requeue the message for another attempt.
     */
    reject(messageId: string, requeue: boolean): Promise<void>;
    /**
     * Get the size of the queue.
     * @returns Number of messages currently in the queue.
     */
    getQueueSize(): Promise<number>;
}