import {injectable, inject, multiInject} from "inversify";
import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {QueueFactory} from "@src/dal/data/core/queue/QueueFactory";
import {NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {QueuePool} from "@src/dal/data/core/queue/QueuePool";

@injectable()
export class QueueBroker {
    constructor(@multiInject('NotificationProvider') providers: NotificationProvider[],
                @inject(QueuePool) private queuePool: QueuePool<NotificationRequest>,
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
            return queue.enqueue(message);
        } else {
            console.error(`Queue not found for channel: ${channel}`);
        }
    }
}