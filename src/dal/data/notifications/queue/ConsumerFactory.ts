import {NotificationConsumer} from "@notifications/queue/NotificationConsumer";
import {injectable} from "inversify";
import {NotificationChannel, NotificationRequest} from "@notifications/core/model";
import {NotificationProvider, NotificationQueue} from "@notifications/core/contract";

@injectable()
export class ConsumerFactory {
    createConsumer(provider: NotificationProvider, notificationChannel: NotificationChannel, queue: NotificationQueue<NotificationRequest>) {
        return new NotificationConsumer(provider, notificationChannel, queue);

    }
}