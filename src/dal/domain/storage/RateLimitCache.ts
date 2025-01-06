import {injectable} from "inversify";

@injectable()
export class RateLimitCache {
    private rateLimits: Map<string, number> = new Map<string, number>();

    constructor() {
    }

    set(key: string, value: number) {
        this.rateLimits.set(key, value)
    }

    getRateLimitReset(key: string) {
        return this.rateLimits.get(key);
    }

}