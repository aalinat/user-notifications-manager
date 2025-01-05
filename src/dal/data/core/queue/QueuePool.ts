import {injectable} from "inversify";
import {MessageQueue, IQueuePool} from "@src/dal/data/core/shared/contract";

@injectable()
export class QueuePool<PAYLOAD> implements IQueuePool<PAYLOAD> {
    private queues = new Map<string, MessageQueue<PAYLOAD>>();

    constructor() {
    }

    getQueue(id: string): MessageQueue<PAYLOAD> {
        const queue = this.queues.get(id);
        if (!queue) {
            throw new Error(`No queue registered for key: ${id}`);
        }
        return queue;
    }

    getQueueIds(): string[] {
        return Array.from(this.queues.keys());
    }

    register(id: string, queue: MessageQueue<PAYLOAD>): void {
        if (this.queues.has(id)) {
            throw new Error("queue key is already defined");
        }
        this.queues.set(id, queue);
    }

}