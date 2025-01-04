import { injectable, inject } from "inversify";
import {UserMapping, UserPreferences, UserRecord} from '@entities/UserRecord';
import {InMemoryUserPreferencesStorage} from "@storage/InMemoryUserPreferencesStorage";

@injectable()
export class UserPreferencesRepository {
    constructor(@inject(InMemoryUserPreferencesStorage) private readonly storage: InMemoryUserPreferencesStorage) {}

    create(userId: string, userRecord: UserRecord): UserMapping {
        return this.storage.create(userId, userRecord);
    }

    update(userId: string, preferences: UserPreferences): UserMapping | null {
        return this.storage.update(userId, preferences);
    }

    findByUserId(userId: string): UserRecord | undefined {
        return this.storage.findByUserId(userId);
    }

    findByEmail(email: string): UserRecord | undefined {
        return this.storage.findByEmail(email);
    }

    findByPhone(telephone: string): UserRecord | undefined {
        return this.storage.findByPhone(telephone);
    }

    findUsers() {
        return this.storage.findUsers();
    }
}