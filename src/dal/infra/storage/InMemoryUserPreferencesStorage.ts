import { injectable } from "inversify";
import {UserPreferences} from "@entities/UserPreferences";

@injectable()
export class InMemoryUserPreferencesStorage {
    private preferences: Map<string, UserPreferences> = new Map();

    create(userPreferences: UserPreferences): UserPreferences {
        this.preferences.set(userPreferences.userId, userPreferences);
        return userPreferences;
    }

    update(userId: string, updatedPreferences: Partial<UserPreferences['preferences']>): UserPreferences | null {
        const existing = this.preferences.get(userId);
        if (!existing) return null;

        const updated = {
            ...existing,
            preferences: {
                ...existing.preferences,
                ...updatedPreferences,
            },
        };

        this.preferences.set(userId, updated);
        return updated;
    }

    findByUserId(userId: string): UserPreferences | undefined {
        return this.preferences.get(userId);
    }
}