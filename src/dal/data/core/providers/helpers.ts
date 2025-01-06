import { AxiosResponse, AxiosError } from 'axios';

import {NotificationError, NotificationResponse, RateLimitError} from "@data/core/shared/model";

export const handleHTTPError = (err: any) => {
    if (err instanceof AxiosError) {
        if (err.code == "ERR_BAD_REQUEST") {
            throw new NotificationError(err.code || "Bad Request", 400)
        }
    }
    if (err?.response?.status === 429) {
        const retryAfterMS: number = parseInt(err.response.headers['retry-after']) * 1000 || 1000;
        const retryLimitReset: number = parseInt(err.response.headers['X-RateLimit-Reset']) || Date.now();
        throw new RateLimitError(err.code || "Too Many requests", 429, retryAfterMS, retryLimitReset)
    }
    throw new NotificationError(err.message || err.code , 500)
}

export const handleResponse = (httpResponse: AxiosResponse): NotificationResponse => {
    if (httpResponse.status == 200) {
        const response = new NotificationResponse();
        response.message = httpResponse.data.message;
        response.status = httpResponse.data.status;
        return response;
    }
    console.log("AXIOS RESPONSE: error occurred: " + httpResponse.status)
    throw new NotificationError("Unknown Error", 500)
}