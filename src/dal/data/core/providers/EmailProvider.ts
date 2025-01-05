import {NotificationProvider} from "@src/dal/data/core/shared/contract";
import {
    NotificationChannel,
    NotificationError,
    NotificationRequest,
    NotificationResponse
} from "@src/dal/data/core/shared/model";
import {inject, injectable} from "inversify";
import {NotificationAPIClient} from "@src/dal/data/core/clients/NotificationAPIClient";
import {AxiosError} from "axios";

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