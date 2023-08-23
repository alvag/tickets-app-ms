export interface ValidationErrorInterface {
    message: string;
    field?: string;
}

export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract errors?: ValidationErrorInterface[];

    protected abstract serializeErrors(): ValidationErrorInterface[];
}
