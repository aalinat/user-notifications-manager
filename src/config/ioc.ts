import { Container } from "inversify";
import {UserPreferencesService} from "@services/UserPreferencesService";
import {UserPreferencesRepository} from "@repositories/UserPreferencesRepository";
import {InMemoryUserPreferencesStorage} from "@src/dal/domain/storage/InMemoryUserPreferencesStorage";
import {UserPreferencesController} from "@controllers/UserPreferencesController";
import {AuthenticationProvider} from "@src/api/authentication/AuthenticationProvider";
import {notificationsContainer} from "@notifications/core/ioc";
import {NotificationController} from "@controllers/NotificationController";
import {NotificationService} from "@services/NotificationService";

const container = new Container();
container.bind(InMemoryUserPreferencesStorage).toSelf().inSingletonScope();
container.bind(UserPreferencesRepository).toSelf().inSingletonScope();
container.bind(UserPreferencesService).toSelf().inSingletonScope();
container.bind(NotificationService).toSelf().inSingletonScope();
container.bind(UserPreferencesController).toSelf().inSingletonScope();
container.bind(NotificationController).toSelf().inSingletonScope();
container.bind(AuthenticationProvider).toSelf();
container.load(notificationsContainer)
export { container };