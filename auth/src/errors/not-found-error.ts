import { CustomError, ValidationErrorInterface } from './custom-error';

export class NotFoundError extends CustomError {
    errors?: ValidationErrorInterface[] | undefined;
    statusCode = 404;

    constructor( public message = 'Not found' ) {
        super( message );

        Object.setPrototypeOf( this, NotFoundError.prototype );
    }

    protected serializeErrors(): ValidationErrorInterface[] {
        return [];
    }

}
