import { CustomError, ValidationErrorInterface } from './custom-error';

export class InternalServerError extends CustomError {
    errors?: ValidationErrorInterface[] | undefined;
    statusCode = 500;

    constructor() {
        super( 'Internal server error' );
        Object.setPrototypeOf( this, InternalServerError.prototype );
    }

    serializeErrors() {
        return [ { message: this.message } ];
    }
}
