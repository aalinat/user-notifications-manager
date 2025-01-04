import {withMiddleware} from "inversify-express-utils";

// Custom decorator for authentication
export function authenticate() {
    return withMiddleware(
        async (req, res, next) => {
            let isAuthenticated = false;
            if (req?.user) {
                isAuthenticated  = await req?.user?.isAuthenticated();
            }
            if (!isAuthenticated) {
                res.status(401).json({ errors: [ 'You must be logged in to access this resource.' ] });
                return;
            }
            next()
        }
    )
}
