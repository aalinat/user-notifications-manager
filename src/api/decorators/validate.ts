import {withMiddleware} from "inversify-express-utils";
import {validate} from "class-validator";
import {plainToInstance} from "class-transformer";
import {createErrorResponse} from "@src/api/utils/response";

export function validated(dtoClass: new () => any) {
    return withMiddleware(
        async (req, res, next) => {
            const dtoObject = plainToInstance(dtoClass, req.body);
            const errors = await validate(dtoObject);
            if (errors.length > 0) {
                const mappedErrors = errors.map((err) => ({
                    property: err.property,
                    constraints: err.constraints
                }))
                res.status(400).json(createErrorResponse("Validation failed", mappedErrors))
                return;
            }
            req.body = dtoObject;
            next();
        })
}
