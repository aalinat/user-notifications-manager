import {injectable, inject} from "inversify";
import {NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {NotificationConsumer} from "@notifications/consumer/NotificationConsumer";
import {NotificationConsumerFactory} from "@notifications/consumer/NotificationConsumerFactory";
import {QueuePool} from "@src/dal/data/core/queue/QueuePool";

@injectable()
export class ConsumerManager {
    private consumers = new Map<NotificationChannel, NotificationConsumer>();
    constructor(@inject(NotificationConsumerFactory) private consumerFactory: NotificationConsumerFactory,
                @inject(QueuePool) private notificationQueuePool: QueuePool<NotificationRequest>) {
        this.notificationQueuePool.getQueueIds().forEach((notificationChannel) => {
            const queue = this.notificationQueuePool.getQueue(notificationChannel);
            const notificationType = NotificationChannel[notificationChannel as keyof typeof NotificationChannel];
            const consumer = consumerFactory.create(notificationType, queue);
            this.consumers.set(notificationType, consumer);
        })
    }

    start() {
        console.log("starting consumer manager...");
        this.consumers.forEach((consumer) => {
            consumer.start(1000)
        });
    }
}