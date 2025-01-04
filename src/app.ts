import 'reflect-metadata';
import express, {urlencoded} from "express";
import morgan from 'morgan';
import { InversifyExpressServer } from 'inversify-express-utils';
import {container} from "@config/ioc";
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from "@config/swagger";
import {AuthenticationProvider} from "@src/api/authentication/AuthenticationProvider";
export const createApp = () => {
    let server = new InversifyExpressServer(container, null, { rootPath: '/api' }, null, AuthenticationProvider);
    server.setConfig((app) => {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        app.use(express.json());
        app.use(
            urlencoded({
                extended: true,
            })
        );
        if (process.env.NODE_ENV === 'development') {
            app.use(morgan('dev'));
        } else {
            app.use(morgan('combined'));
        }
    });
    server.setErrorConfig((app) => {
        app.use((err: any, req: any, res: express.Response, next: express.NextFunction) => {
            if (err) {
                console.error(err);
                res.status(err.status || 500).json({
                    message: err.message || 'Internal Server Error',
                    details: err.details || 'An unexpected error occurred',
                });
            } else {
                next();
            }
        });
    });

    return server.build();
}