import {IsEnum, IsNotEmpty} from "class-validator";

export enum NotificationChannel {SMS= "sms", EMAIL = "email"}

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
    enqueueTime: number;
}

export interface QueueConfig {
    maxRetries?: number;          // Maximum retries before DLQ
}


export class BulkSendRecord {
    constructor(public  messageId: string, public  notificationChannel: NotificationChannel) {
    }
}