import { Container } from "inversify";
import {UserPreferencesService} from "@services/UserPreferencesService";
import {UserPreferencesRepository} from "@repositories/UserPreferencesRepository";
import {InMemoryUserPreferencesStorage} from "@storage/InMemoryUserPreferencesStorage";
import {UserPreferencesController} from "@controllers/UserPreferencesController";
import {AuthenticationProvider} from "@src/api/authentication/AuthenticationProvider";

const container = new Container();
container.bind(InMemoryUserPreferencesStorage).toSelf();
container.bind(UserPreferencesRepository).toSelf();
container.bind(UserPreferencesService).toSelf();
container.bind(UserPreferencesController).toSelf();
container.bind(AuthenticationProvider).toSelf();
export { container };