export class UserRecord {
    constructor(
        public email: string,
        public telephone: string,
        public preferences: UserPreferences
    ) {
    }
}

export class UserPreferences {
    constructor(public sms: boolean, public email: boolean ) {
    }
}
export class UserMapping {
    constructor(public userId: string, public record: UserRecord) {
    }
}