import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {
    NotificationChannel,
    NotificationRequest,
    NotificationResponse
} from "@src/dal/data/core/shared/model";
import {inject, injectable} from "inversify";
import {NotificationAPIClient} from "@src/dal/data/core/clients/NotificationAPIClient";
import {handleHTTPError, handleResponse} from "@data/core/providers/helpers";

@injectable()
export class EmailProvider implements NotificationProvider {

    constructor(@inject(NotificationAPIClient) private emailProvider: NotificationAPIClient) {
    }

    getId(): NotificationChannel {
        return NotificationChannel.EMAIL;
    }

    getProviderName(): string {
        return "VimEmailProvider";
    }

    async send(notification: NotificationRequest): Promise<NotificationResponse> {
        try {
            const httpResponse = await this.emailProvider.sendEmail(notification.email, notification.message);
            console.log("EMAIL SENT: " + JSON.stringify(notification));
            return handleResponse(httpResponse)
        } catch (err: any) {
            return handleHTTPError(err);
        }
    }

}