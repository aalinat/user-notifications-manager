import {inject, injectable} from "inversify";
import {BulkSendRecord, NotificationChannel, NotificationRequest} from "@notifications/core/model";
import {ProviderRegistry} from "@notifications/providers/NotificationProviderRegistry";

@injectable()
export class NotificationManager {

    constructor(@inject(ProviderRegistry) private registry: ProviderRegistry) {
    }

    async send(channels: NotificationChannel[], request: NotificationRequest): Promise<BulkSendRecord[]> {
        const messageIds: BulkSendRecord[] = [];
        await Promise.all(channels.map(async (channel) => {
            const messageId = await this.route(channel, request);
            if (!messageId) {
                console.error("message not enqueued for send: " + request.to)
                return;
            }
            messageIds.push(new BulkSendRecord(messageId, channel));
        }));

        return messageIds;
    }
    route<T>(channel: NotificationChannel, message: NotificationRequest) {
        const queue = this.registry.getQueue(channel)
        if (queue) {
            return queue.enqueue(message);
        } else {
            console.error(`Queue not found for channel: ${channel}`);
        }
    }
}