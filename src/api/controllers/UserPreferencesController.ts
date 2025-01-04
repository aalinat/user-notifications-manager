import {UserPreferencesService} from "@services/UserPreferencesService";
import {CreateUserPreferencesDTO} from "@dto/CreateUserPreferencesDTO";
import {UpdateUserPreferencesDTO} from "@dto/UpdateUserPreferencesDTO";
import {createResponse} from "@src/api/utils/response";
import {inject} from "inversify";
import {
    controller, BaseHttpController, httpPost, httpPut, requestParam, requestBody
} from "inversify-express-utils";
import {authenticate} from "@src/api/authentication/IsAuthenticationDecorator";

@controller('/preferences')
export class UserPreferencesController extends BaseHttpController {
    constructor(@inject(UserPreferencesService) private readonly service: UserPreferencesService) {
        super();
    }

    /**
     * Create user preferences
     * @param body The user preferences data
     */
    @httpPost("")
    @authenticate()
    public async createUserPreferences(@requestBody() body: CreateUserPreferencesDTO) {
        const userPreferences = this.service.createUserPreferences(body);
        return this.json(createResponse(
                'success',
                'User preferences created successfully',
                userPreferences)
            , 201);
    };

    /**
     * Update user preferences
     * @param userId The user id
     * @param body The user preferences data
     */
    @httpPut('/:userId')
    public async updateUserPreferences(@requestParam("userId") userId: string, @requestBody() body: UpdateUserPreferencesDTO) {
        const updated = this.service.updateUserPreferences(userId, body);
        if (!updated) {
            return this.json(createResponse('error', 'User not found'), 404);
        } else {
            return this.json(createResponse('success', 'User preferences updated successfully', updated));
        }
    };
}