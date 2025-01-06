import {inject, injectable} from "inversify";
import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {
    NotificationChannel,
    NotificationRequest,
    NotificationResponse
} from "@src/dal/data/core/shared/model";
import {NotificationAPIClient} from "@src/dal/data/core/clients/NotificationAPIClient";
import {handleHTTPError, handleResponse} from "@data/core/providers/helpers";
@injectable()
export class SMSProvider implements NotificationProvider {
    constructor(@inject(NotificationAPIClient) private smsProvider: NotificationAPIClient) {
    }
    getId(): NotificationChannel {
        return NotificationChannel.SMS;
    }

    getProviderName(): string {
        return "VimSMSProvider";
    }

    async send(notification: NotificationRequest): Promise<NotificationResponse> {
        try {
            const httpResponse = await this.smsProvider.sendSMS(notification.telephone, notification.message);
            console.log("SMS SENT: " + JSON.stringify(notification));
            return handleResponse(httpResponse)
        } catch (err: any) {
            return handleHTTPError(err);
        }
    }
}