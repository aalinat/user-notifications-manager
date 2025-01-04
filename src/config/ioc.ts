import { Container } from "inversify";
import {UserPreferencesService} from "@services/UserPreferencesService";
import {UserPreferencesRepository} from "@repositories/UserPreferencesRepository";
import {InMemoryUserPreferencesStorage} from "@storage/InMemoryUserPreferencesStorage";
import {UserPreferencesController} from "@controllers/UserPreferencesController";
import {AuthenticationProvider} from "@src/api/authentication/AuthenticationProvider";

const container = new Container();
container.bind(InMemoryUserPreferencesStorage).toSelf().inSingletonScope();
container.bind(UserPreferencesRepository).toSelf().inSingletonScope();
container.bind(UserPreferencesService).toSelf().inSingletonScope();
container.bind(UserPreferencesController).toSelf().inSingletonScope();
container.bind(AuthenticationProvider).toSelf();
export { container };