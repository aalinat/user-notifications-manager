export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message: string;
    data?: T;
    error?: string;
    [key: string]: unknown;
}

export const createResponse = <T>(status: 'success' | 'error', message: string, data?: T, error?: string): ApiResponse<T> => {
    return {
        status,
        message,
        data,
        error,
    };
};

export class ValidationError {
    constructor(public property: string, public constraints: any) {
    }
}
export const createErrorResponse = (message: string, errors?: ValidationError[]) =>  {
    return {
        status: "error",
        message,
        errors
    };
}