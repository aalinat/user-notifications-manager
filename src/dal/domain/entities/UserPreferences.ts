export class UserPreferences {
    constructor(
        public userId: string,
        public telephone: string,
        public preferences: { sms: boolean; email: boolean }
    ) {}
}