import {UserPreferencesService} from "@services/UserPreferencesService";
import {CreateUserPreferencesRequest} from "@dto/CreateUserPreferencesRequest";
import {UpdateUserPreferencesRequest} from "@dto/UpdateUserPreferencesRequest";
import {createResponse} from "@src/api/utils/response";
import {inject} from "inversify";
import {
    controller, BaseHttpController, httpPost, httpPut, requestParam, requestBody, httpGet
} from "inversify-express-utils";
import {authenticate} from "@src/api/decorators/authenticate";
import {validated} from "@src/api/decorators/validate";
import {isUUID} from "class-validator";

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
    @validated(CreateUserPreferencesRequest)
    public async createUserPreferences(@requestBody() body: CreateUserPreferencesRequest) {
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
    @authenticate()
    @validated(UpdateUserPreferencesRequest)
    public async updateUserPreferences(@requestParam("userId") userId: string, @requestBody() body: UpdateUserPreferencesRequest) {
        if (!isUUID(userId)) {
            return this.json(createResponse('error', 'Empty user id'), 404);
        }
        const updated = this.service.updateUserPreferences(userId, body);
        if (!updated) {
            return this.json(createResponse('error', 'User not found'), 404);
        } else {
            return this.json(createResponse('success', 'User preferences updated successfully', updated));
        }
    };

    /**
     * get all users: testing purposes only!
     * in real life pagination would be implemented
     */
    @httpGet("")
    public async getAllUsers() {
        const users = this.service.getUsers();
        return this.json(createResponse('success', '', users));
    }
}