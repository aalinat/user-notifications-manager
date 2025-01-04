import express from "express";
import {injectable} from 'inversify';
import {AUTHENTICATION_TOKEN} from "@config/config";
import {interfaces} from "inversify-express-utils";
import {Principal, User} from "@src/api/authentication/Principal";


@injectable()
export class AuthenticationProvider implements interfaces.AuthProvider {
    public async getUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<interfaces.Principal> {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            req.user = new Principal(new User(false))
        } else {
            const token = authHeader.split(' ')[1];
            if (token !== AUTHENTICATION_TOKEN) {
                req.user = new Principal(new User(false));
            }
            req.user = new Principal(new User(true));
        }
        return req.user;
    }
}

