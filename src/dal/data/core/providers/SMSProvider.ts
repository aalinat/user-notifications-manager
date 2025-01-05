import {inject, injectable} from "inversify";
import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {
    NotificationChannel,
    NotificationError,
    NotificationRequest,
    NotificationResponse
} from "@src/dal/data/core/shared/model";
import {NotificationAPIClient} from "@src/dal/data/core/clients/NotificationAPIClient";
import {AxiosError} from "axios";
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
            if (httpResponse.status == 200) {
                const response = new NotificationResponse();
                response.message = httpResponse.data.message;
                response.status = httpResponse.data.status;
                return response;
            }
            console.log("error occured: " + httpResponse.status)
        } catch (err: any) {
            if (err instanceof AxiosError) {
                if (err.code == "ERR_BAD_REQUEST") {
                    throw new NotificationError(err.code || "Bad Request", 400)
                }
            }
            throw new NotificationError(err.message , 500)
        }
        throw new NotificationError("Unknown Error", 500)
    }
}