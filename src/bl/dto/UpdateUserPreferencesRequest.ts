import { ValidateNested} from 'class-validator';
import {Type} from "class-transformer";
import {Preferences} from "@src/bl/dto/Preferences";

export class UpdateUserPreferencesRequest {
    @ValidateNested()
    @Type(() => Preferences)
    preferences!: Preferences;
}