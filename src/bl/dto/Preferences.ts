import {IsBoolean} from "class-validator";

export class Preferences {
    @IsBoolean()
    sms!: boolean;

    @IsBoolean()
    email!: boolean;
}