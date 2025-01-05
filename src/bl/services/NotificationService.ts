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
        const notificationRequest = new NotificationRequest();
        const user = this.userPreferencesService.getUserById(request.userId);
        if (!user) {
            throw new Error("cannot send notification, user not found");
        }
        notificationRequest.message = request.message;

        const channels: NotificationChannel[] = [];
        if (user.preferences.email) {
            notificationRequest.email = user.email;
            channels.push(NotificationChannel.EMAIL);
        }
        if (user.preferences.sms) {
            notificationRequest.telephone = user.telephone;
            channels.push(NotificationChannel.SMS)
        }
        return this.notificationManager.send(channels, notificationRequest);
    }
}