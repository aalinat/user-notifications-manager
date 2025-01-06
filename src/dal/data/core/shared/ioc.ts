import { ContainerModule, interfaces  } from 'inversify';
import {NotificationRequest} from "@data/core/shared/model";
import {QueueFactory} from "@data/core/queue/QueueFactory";
import {QueuePool} from "@data/core/queue/QueuePool";
import {NotificationConsumerFactory} from "@notifications/consumer/NotificationConsumerFactory";
import {ConsumerManager} from "@notifications/consumer/ConsumerManager";
import {NotificationAPIClient} from "@data/core/clients/NotificationAPIClient";
import {NotificationProvider} from "@data/core/shared/contract";
import {EmailProvider} from "@data/core/providers/EmailProvider";
import {SMSProvider} from "@data/core/providers/SMSProvider";
import {ProviderRegistry} from "@data/core/providers/ProviderRegistry";
import {NotificationManager} from "@notifications/NotificationManager";
import {QueueBroker} from "@notifications/QueueBroker";
import {RateLimitCache} from "@src/dal/domain/storage/RateLimitCache";


export const notificationsContainer = new ContainerModule((bind: interfaces.Bind) => {
    // Consumer
    bind<NotificationConsumerFactory>(NotificationConsumerFactory).toSelf();
    bind<ConsumerManager>(ConsumerManager).toSelf().inSingletonScope();
    // Client
    bind<NotificationAPIClient>(NotificationAPIClient).toSelf();
    // Providers
    bind<NotificationProvider>("NotificationProvider").to(EmailProvider);
    bind<NotificationProvider>("NotificationProvider").to(SMSProvider);
    bind<ProviderRegistry>(ProviderRegistry).toSelf();
    // Service
    bind<NotificationManager>(NotificationManager).toSelf().inSingletonScope();
    // Queue
    bind<QueueFactory<NotificationRequest>>(QueueFactory).toSelf();
    bind<QueuePool<NotificationRequest>>(QueuePool).toSelf().inSingletonScope();
    bind<QueueBroker>(QueueBroker).toSelf().inSingletonScope();
    bind<RateLimitCache>(RateLimitCache).toSelf().inSingletonScope();
});
