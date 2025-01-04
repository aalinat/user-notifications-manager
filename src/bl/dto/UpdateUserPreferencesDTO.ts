import {IsUUID, ValidateNested} from 'class-validator';
import {Type} from "class-transformer";
import {Preferences} from "@src/bl/dto/Preferences";

export class UpdateUserPreferencesDTO {
    @IsUUID()
    userId!: string;
    @ValidateNested()
    @Type(() => Preferences)
    preferences!: Preferences;
}