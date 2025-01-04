import { IsEmail, IsString, ValidateNested, Length } from 'class-validator';
import { Type } from 'class-transformer';
import {Preferences} from "@src/bl/dto/Preferences";



export class CreateUserPreferencesDTO {
    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @IsString()
    @Length(10, 15, { message: 'Telephone must be between 10 and 15 characters' })
    telephone!: string;

    @ValidateNested()
    @Type(() => Preferences)
    preferences!: Preferences;
}