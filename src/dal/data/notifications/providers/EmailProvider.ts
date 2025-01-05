import {NotificationProvider} from "@notifications/core/contract";
import {
    NotificationChannel,
    NotificationError,
    NotificationRequest,
    NotificationResponse
} from "@notifications/core/model";
import {inject, injectable} from "inversify";
import {NotificationAPIClient} from "@src/dal/data/notifications/NotificationAPIClient";
import {AxiosError} from "axios";

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
            if (err instanceof AxiosError) {
                throw new NotificationError(err.code || "Network Error", 500)
            }
            return new NotificationResponse();
        }
    }

}