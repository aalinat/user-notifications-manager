
import {UserPreferencesRepository} from "@src/dal/domain/repositories/UserPreferencesRepository";
import {CreateUserPreferencesRequest} from "@dto/CreateUserPreferencesRequest";
import {UserMapping, UserPreferences, UserRecord} from "@entities/UserRecord";
import {UpdateUserPreferencesRequest} from "@dto/UpdateUserPreferencesRequest";
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from "inversify";



@injectable()
export class UserPreferencesService {
    constructor(@inject(UserPreferencesRepository) private readonly repository: UserPreferencesRepository) {}

    createUserPreferences(data: CreateUserPreferencesRequest): UserMapping {
        if (this.repository.findByEmail(data.email)) {
            throw new Error("Email already exists");
        }
        if (this.repository.findByPhone(data.telephone)) {
            throw new Error("Phone already exists");
        }
        const userId = uuidv4();  // Auto-generate userId
        const userPreferences = new UserRecord(data.email, data.telephone, data.preferences);
        return this.repository.create(userId, userPreferences);
    }

    updateUserPreferences(userId: string, data: UpdateUserPreferencesRequest): UserMapping | null {
        if (!this.repository.findByUserId(userId)) {
            throw new Error("user id not found")
        }
        return this.repository.update(userId, new UserPreferences(data.preferences.sms, data.preferences.email));
    }

    getUsers() {
        return this.repository.findUsers();
    }

    getUserById(userId: string) {
        return this.repository.findByUserId(userId);
    }
}