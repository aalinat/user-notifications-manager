import {injectable} from "inversify";
import {InMemoryQueue} from "@src/dal/data/core/queue/impl/InMemoryQueue";

@injectable()
export class QueueFactory<PAYLOAD> {
    constructor() {
    }

    create() {
        return new InMemoryQueue<PAYLOAD>();
    }
}