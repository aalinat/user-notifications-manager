import { injectable, inject } from "inversify";
import { UserPreferences } from '@entities/UserPreferences';
import {InMemoryUserPreferencesStorage} from "@storage/InMemoryUserPreferencesStorage";

@injectable()
export class UserPreferencesRepository {
    constructor(@inject(InMemoryUserPreferencesStorage) private readonly storage: InMemoryUserPreferencesStorage) {}

    create(userPreferences: UserPreferences): UserPreferences {
        return this.storage.create(userPreferences);
    }

    update(userId: string, preferences: Partial<UserPreferences['preferences']>): UserPreferences | null {
        return this.storage.update(userId, preferences);
    }

    findByUserId(userId: string): UserPreferences | undefined {
        return this.storage.findByUserId(userId);
    }
}