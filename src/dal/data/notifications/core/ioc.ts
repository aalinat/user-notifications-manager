import { ContainerModule, interfaces  } from 'inversify';
import {NotificationProvider} from "@notifications/core/contract";
import {EmailProvider} from "@notifications/providers/EmailProvider";
import {NotificationAPIClient} from "@notifications/NotificationAPIClient";
import {ProviderRegistry} from "@notifications/providers/NotificationProviderRegistry";
import {NotificationManager} from "@notifications/NotificationManager";
import {SMSProvider} from "@notifications/providers/SMSProvider";
import {NotificationConsumer} from "@notifications/queue/NotificationConsumer";
import {QueueFactory} from "@notifications/queue/QueueFactory";
import {ConsumerFactory} from "@notifications/queue/ConsumerFactory";

export const notificationsContainer = new ContainerModule((bind: interfaces.Bind) => {
    bind<QueueFactory>(QueueFactory).toSelf();
    bind<QueueFactory>(ConsumerFactory).toSelf();
    bind<NotificationAPIClient>(NotificationAPIClient).toSelf();
    bind<NotificationProvider>("NotificationProvider").to(EmailProvider);
    bind<NotificationProvider>("NotificationProvider").to(SMSProvider);
    bind<ProviderRegistry>(ProviderRegistry).toSelf();
    bind<NotificationConsumer>(NotificationConsumer).toSelf();
    bind<NotificationManager>(NotificationManager).toSelf().inSingletonScope();
});
