import {injectable} from "inversify";
import {UserMapping, UserPreferences, UserRecord} from "@entities/UserRecord";

@injectable()
export class InMemoryUserPreferencesStorage {
    private preferences: Map<string, UserRecord> = new Map();
    //email Index
    private emailIndex: Map<string, string> = new Map();
    private phoneIndex: Map<string, string> = new Map();

    create(userId: string, userPreferences: UserRecord): UserMapping {
        this.preferences.set(userId, userPreferences);
        this.emailIndex.set(userPreferences.email, userId);
        this.phoneIndex.set(userPreferences.telephone, userId);
        return new UserMapping(userId, userPreferences);
    }

    update(userId: string, userPreferences: UserPreferences): UserMapping | null {
        const existing = this.preferences.get(userId);
        if (!existing) return null;

        const updated: UserRecord = {
            email: existing.email,
            telephone: existing.telephone,
            preferences: userPreferences
        };
        this.preferences.set(userId, updated);
        return new UserMapping(userId, updated);
    }

    findByUserId(userId: string): UserRecord | undefined {
        return this.preferences.get(userId);
    }

    findByEmail(email: string): UserRecord | undefined {
        const userId = this.emailIndex.get(email);
        if (!userId) {
            return undefined;
        }
        return this.preferences.get(userId);
    }

    findByPhone(telephone: string): UserRecord | undefined {
        const userId = this.phoneIndex.get(telephone);
        if (!userId) {
            return undefined;
        }
        return this.preferences.get(userId);
    }

    findUsers(): UserMapping[] {
        const mapping: UserMapping[] = [];
        this.preferences.forEach((record, userId) => {
            mapping.push(new UserMapping(userId, record))
        });
        return mapping;
    }
}