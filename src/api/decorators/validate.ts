import {withMiddleware} from "inversify-express-utils";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";

export function validated(dtoClass: new () => any) {
    return withMiddleware(
        async (req, res, next) => {
            const dtoObject = plainToInstance(dtoClass, req.body);
            const errors = await validate(dtoObject);
            if (errors.length > 0) {
                res.status(400).json({
                    message: 'Validation failed',
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints
                    }))
                });
                return;
            }
            req.body = dtoObject;
            next();
        })
}
