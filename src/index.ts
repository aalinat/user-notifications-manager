import {PORT} from "@config/config";
import {createApp} from "@src/app";
import expressListEndpoints from "express-list-endpoints";
import {container} from "@config/ioc";
import {ConsumerManager} from "@notifications/consumer/ConsumerManager";


const app = createApp();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const consumerManager = container.get<ConsumerManager>(ConsumerManager);
consumerManager.start();
console.log(expressListEndpoints(app));