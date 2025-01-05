import {injectable} from "inversify";
import {InMemoryNotificationQueue} from "@notifications/queue/InMemoryNotificationQueue";

@injectable()
export class QueueFactory {
    createQueue() {
        return new InMemoryNotificationQueue();
    }
}