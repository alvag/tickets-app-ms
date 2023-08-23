import { CustomError, ValidationErrorInterface } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    errors?: ValidationErrorInterface[] | undefined;

    constructor(
        public message = 'Error connecting to database',
        public statusCode = 500 ) {
        super( message );

        Object.setPrototypeOf( this, DatabaseConnectionError.prototype );
    }

    serializeErrors(): ValidationErrorInterface[] {
        return [];
    }

}
