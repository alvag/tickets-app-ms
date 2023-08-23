import { CustomError, ValidationErrorInterface } from './custom-error';

export class BadRequestError extends CustomError {
    statusCode = 400;
    errors?: ValidationErrorInterface[] | undefined;

    constructor( public message: string ) {
        super( message );
        Object.setPrototypeOf( this, BadRequestError.prototype );
    }

    protected serializeErrors(): ValidationErrorInterface[] {
        return [];
    }
}
