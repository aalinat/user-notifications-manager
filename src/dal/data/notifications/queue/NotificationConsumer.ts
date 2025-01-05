import {inject, injectable} from "inversify";
import {ProviderRegistry} from "@notifications/providers/NotificationProviderRegistry";
import {NotificationChannel, NotificationRequest, NotificationResponse} from "@notifications/core/model";

@injectable()
export class NotificationConsumer {
    constructor(@inject(ProviderRegistry) private registry: ProviderRegistry) {
    }

    async handle(channel: NotificationChannel, request: NotificationRequest): Promise<NotificationResponse> {
        const provider = this.registry.getProvider(channel);
        await provider.send(request)
        return new NotificationResponse();
    }
}