import {inject, injectable} from "inversify";
import {NotificationManager} from "@notifications/NotificationManager";
import {SendNotificationRequest} from "@dto/SendNotificationRequest";
import {NotificationChannel, NotificationRequest} from "@src/dal/data/core/shared/model";
import {UserPreferencesService} from "@services/UserPreferencesService";

@injectable()
export class NotificationService {
    constructor(@inject(NotificationManager) private notificationManager: NotificationManager,
                @inject(UserPreferencesService) private userPreferencesService: UserPreferencesService) {
    }

    sendMessage(request: SendNotificationRequest) {
        const user = this.userPreferencesService.getUserById(request.userId);
        if (!user) {
            throw new Error("cannot send notification, user not found");
        }
        const requests: NotificationRequest[] = [];
        if (user.preferences.email) {
            const emailNotificationRequest = new NotificationRequest();
            emailNotificationRequest.message = request.message;
            emailNotificationRequest.email = user.email;
            emailNotificationRequest.channel = NotificationChannel.EMAIL;
            requests.push(emailNotificationRequest);
        }
        if (user.preferences.sms) {
            const SMSNotificationRequest = new NotificationRequest();
            SMSNotificationRequest.message = request.message;
            SMSNotificationRequest.channel = NotificationChannel.SMS;
            SMSNotificationRequest.telephone = user.telephone;
            requests.push(SMSNotificationRequest)
        }
        return this.notificationManager.send(requests);
    }
}