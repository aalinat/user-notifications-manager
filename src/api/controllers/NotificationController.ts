import {BaseHttpController, controller, httpPost, requestBody} from "inversify-express-utils";
import {createResponse} from "@src/api/utils/response";
import {authenticate} from "@src/api/decorators/authenticate";
import {SendNotificationRequest} from "@dto/SendNotificationRequest";
import {validated} from "@src/api/decorators/validate";
import {NotificationService} from "@services/NotificationService";
import {inject} from "inversify";

@controller('/notifications')
export class NotificationController extends BaseHttpController {
    constructor(@inject(NotificationService) private notificationService: NotificationService) {
        super();
    }
    /**
     * send notification to a user
     * @param request user id & message
     */
    @httpPost("")
    @authenticate()
    @validated(SendNotificationRequest)
    public async createUserPreferences(@requestBody() request: SendNotificationRequest) {
        const messageIds = await this.notificationService.sendMessage(request)
        return this.json(createResponse(
                'success',
                '',
                messageIds)
            , 201);
    };
}