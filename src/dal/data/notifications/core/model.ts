import {IsEnum, IsNotEmpty} from "class-validator";

export enum NotificationChannel {SMS= "sms", EMAIL = "email"}

export enum NotificationStatus {
    sent
}

export class NotificationRequest {
    @IsNotEmpty()
    to!: string;
    @IsNotEmpty()
    message!: string;
}

export class NotificationResponse {
    @IsEnum(NotificationStatus)
    status!: NotificationStatus
    @IsNotEmpty()
    message!: string;
}


export class NotificationError extends Error {
    constructor(message: string, public errorCode: number) {
        super(message);
        this.name = 'NotificationError';
    }
}

export interface QueueMessage<T> {
    id: string;
    payload: T;
    retries: number;
    enqueueTime: Date;
}

export interface QueueConfig {
    rateLimit?: number;           // Max messages per second
    limitWindow?: number;         // Time window for rate limiting (ms)
    maxRetries?: number;          // Maximum retries before DLQ
    delayBetweenRetries?: number; // Delay between retry attempts (ms)
}


export class BulkSendRecord {
    constructor(public  messageId: string, public  notificationChannel: NotificationChannel) {
    }
}