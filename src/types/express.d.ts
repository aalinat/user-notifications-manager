import { Principal } from '../api/authentication/AuthenticationProvider';

declare global {
    namespace Express {
        interface Request {
            user?: Principal;  // Attach Principal type to Request
        }
    }
}