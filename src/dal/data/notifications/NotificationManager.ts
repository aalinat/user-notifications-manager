import {inject, injectable} from "inversify";
import {BulkSendRecord, NotificationRequest} from "@src/dal/data/core/shared/model";
import {QueueBroker} from "@notifications/QueueBroker";

@injectable()
export class NotificationManager {

    constructor(@inject(QueueBroker) private broker: QueueBroker) {
    }

    async send(requests: NotificationRequest[] ): Promise<BulkSendRecord[]> {
        const messageIds: BulkSendRecord[] = [];
        await Promise.all(requests.map(async (request) => {
            const messageId = await this.broker.route(request.channel, request);
            if (!messageId) {
                console.error("message not enqueued for send: " + JSON.stringify(request))
                return;
            }
            messageIds.push(new BulkSendRecord(messageId, request.channel));
        }));

        return messageIds;
    }
}