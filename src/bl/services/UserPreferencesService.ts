
import {UserPreferencesRepository} from "@src/dal/domain/repositories/UserPreferencesRepository";
import {CreateUserPreferencesDTO} from "@src/bl/dto/CreateUserPreferencesDTO";
import {UserPreferences} from "@src/dal/domain/entities/UserPreferences";
import {UpdateUserPreferencesDTO} from "@src/bl/dto/UpdateUserPreferencesDTO";
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from "inversify";



@injectable()
export class UserPreferencesService {
    constructor(@inject(UserPreferencesRepository) private readonly repository: UserPreferencesRepository) {}

    createUserPreferences(data: CreateUserPreferencesDTO): UserPreferences {
        const userId = uuidv4();  // Auto-generate userId
        const userPreferences = new UserPreferences(userId, data.telephone, data.preferences);
        return this.repository.create(userPreferences);
    }

    updateUserPreferences(userId: string, data: UpdateUserPreferencesDTO): UserPreferences | null {
        return this.repository.update(userId, {
            ...data.preferences,
        });
    }
}