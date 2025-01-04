import {PORT} from "@config/config";
import {createApp} from "@src/app";
import expressListEndpoints from "express-list-endpoints";



const app = createApp();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
console.log(expressListEndpoints(app));