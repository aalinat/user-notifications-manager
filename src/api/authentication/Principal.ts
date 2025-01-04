import {interfaces} from "inversify-express-utils";

export class User {
    constructor(public isAuthenticated: boolean) {
    }
}

export class Principal implements interfaces.Principal<User> {
    details: User;

    public constructor(details: User) {
        this.details = details;
    }

    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(this.details.isAuthenticated);
    }

    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    isResourceOwner(resourceId: unknown): Promise<boolean> {
        return Promise.resolve(false);
    }
}