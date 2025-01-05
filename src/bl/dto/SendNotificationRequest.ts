import {IsString, IsUUID} from "class-validator";

export class SendNotificationRequest {
    @IsString()
    @IsUUID('4', { message: 'User Id must be a valid UUID v4' })
    userId!: string;
    @IsString()
    message!: string;
}