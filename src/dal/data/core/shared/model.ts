import {IsEnum, IsNotEmpty} from "class-validator";

export enum NotificationChannel {SMS= "SMS", EMAIL = "EMAIL"}

export enum NotificationStatus {
    sent
}

export class NotificationRequest {
    @IsNotEmpty()
    email!: string;
    @IsNotEmpty()
    telephone!: string;
    @IsNotEmpty()
    message!: string;
    @IsNotEmpty()
    channel!: NotificationChannel;
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

export class RateLimitError extends Error {
    constructor(message: string, public errorCode: number, public retryAfterMS: number, public retryLimitReset: number) {
        super(message);
        this.name = 'RateLimitError';
    }
}

export interface QueueMessage<T> {
    id: string;
    payload: T;
    retries: number;
    enqueueTime: number;
    dueTime: number;
}

export interface QueueConfig {
    maxRetries?: number;          // Maximum retries before DLQ
}


export class BulkSendRecord {
    constructor(public  messageId: string, public  notificationChannel: NotificationChannel) {
    }
}