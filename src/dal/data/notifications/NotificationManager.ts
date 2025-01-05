import {inject, injectable} from "inversify";
import {BulkSendRecord, NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {QueueBroker} from "@notifications/QueueBroker";

@injectable()
export class NotificationManager {

    constructor(@inject(QueueBroker) private broker: QueueBroker) {
    }

    async send(channels: NotificationChannel[], request: NotificationRequest): Promise<BulkSendRecord[]> {
        const messageIds: BulkSendRecord[] = [];
        await Promise.all(channels.map(async (channel) => {
            const messageId = await this.broker.route(channel, request);
            if (!messageId) {
                console.error("message not enqueued for send: " + JSON.stringify(request))
                return;
            }
            messageIds.push(new BulkSendRecord(messageId, channel));
        }));

        return messageIds;
    }
}