import {inject, injectable} from "inversify";
import {NotificationProvider} from "@notifications/core/contract";
import {NotificationChannel, NotificationRequest, NotificationResponse} from "@notifications/core/model";
import {NotificationAPIClient} from "@notifications/NotificationAPIClient";

@injectable()
export class SMSProvider implements NotificationProvider {
    constructor(@inject(NotificationAPIClient) private smsProvider: NotificationAPIClient) {
    }
    getProviderChannel(): NotificationChannel {
        return NotificationChannel.SMS;
    }

    getProviderName(): string {
        return "VimSMSProvider";
    }

    async send(notification: NotificationRequest): Promise<NotificationResponse> {
        try {
            const response = await this.smsProvider.sendSMS(notification.to, notification.message);
            return new NotificationResponse();
        } catch (err) {
            return new NotificationResponse();
        }
    }

}