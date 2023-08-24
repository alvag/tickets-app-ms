import { CustomError, ValidationErrorInterface } from './custom-error';

export class UnauthorizedError extends CustomError {
    errors?: ValidationErrorInterface[] | undefined;
    statusCode = 401;

    constructor() {
        super( 'Unauthorized' );
        Object.setPrototypeOf( this, UnauthorizedError.prototype );
    }

    serializeErrors() {
        return [ { message: this.message } ];
    }
}
