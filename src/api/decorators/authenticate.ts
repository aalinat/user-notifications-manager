import {withMiddleware} from "inversify-express-utils";
import {createResponse} from "@src/api/utils/response";

export function authenticate() {
    return withMiddleware(
        async (req, res, next) => {
            let isAuthenticated = false;
            if (req?.user) {
                isAuthenticated = await req?.user?.isAuthenticated();
            }
            if (!isAuthenticated) {
                res.status(401).json(createResponse("error", 'You must be logged in to access this resource.', undefined, 'You must be logged in to access this resource.'));
                return;
            }
            next()
        }
    )
}
