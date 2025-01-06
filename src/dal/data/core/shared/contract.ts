import {
    NotificationRequest,
    NotificationResponse,
    QueueConfig,
    QueueMessage
} from "@src/dal/data/core/shared/model";

export interface IQueueBroker<PAYLOAD> {
    route(key: string, payload: PAYLOAD):  void
}

export interface IProvider {
    getProviderName(): string;
    getId(): string
}
export interface NotificationProvider extends IProvider{
    send(notification: NotificationRequest): Promise<NotificationResponse>;
}
export interface IProviderRegistry<PROVIDER> {
    getProvider(id: string): PROVIDER;
}

export interface IQueuePool<PAYLOAD> {
    getQueue(id: string): MessageQueue<PAYLOAD>;
    getQueueIds(): string[];
    register(id: string, queue: MessageQueue<PAYLOAD>): void;
}

export interface MessageQueue<PAYLOAD> {
    configure(config: QueueConfig): void;
    enqueue(message: PAYLOAD, dueTime: number): Promise<string>;
    /**
     * Dequeue a message from the queue.
     * @returns The next message in the queue or null if empty.
     */
    dequeue(): Promise<QueueMessage<PAYLOAD> | null>;
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