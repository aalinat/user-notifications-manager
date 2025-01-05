import {NotificationProvider} from "@notifications/core/contract";
import {NotificationChannel, NotificationRequest, NotificationResponse} from "@notifications/core/model";
import {inject, injectable} from "inversify";
import {NotificationAPIClient} from "@src/dal/data/notifications/NotificationAPIClient";

@injectable()
export class EmailProvider implements NotificationProvider {

    constructor(@inject(NotificationAPIClient) private emailProvider: NotificationAPIClient) {
    }
    getProviderChannel(): NotificationChannel {
        return NotificationChannel.EMAIL;
    }

    getProviderName(): string {
        return "VimEmailProvider";
    }

    async send(notification: NotificationRequest): Promise<NotificationResponse> {
        try {
            const response = await this.emailProvider.sendEmail(notification.to, notification.message);
            return new NotificationResponse();
        } catch (err) {
            return new NotificationResponse();
        }
    }

}