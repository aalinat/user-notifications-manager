import {CreateUserPreferencesRequest} from "../../src/bl/dto/CreateUserPreferencesRequest";

export const  Constants =  {
    EMAIL: "user@example.com",
    TELEPHONE: "+123456786",
    PREFERENCES: { sms: true, email: true},
}

export const HappyRequest: CreateUserPreferencesRequest = {
    email: Constants.EMAIL,
    telephone: Constants.TELEPHONE,
    preferences: Constants.PREFERENCES
}