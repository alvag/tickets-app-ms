import { ValidationError } from 'express-validator';
import { CustomError, ValidationErrorInterface } from './custom-error';

export class RequestValidationError extends CustomError {
    errors: ValidationErrorInterface[] = [];

    constructor(
        public validationErrors: ValidationError[],
        public message = 'Invalid request parameters',
        public statusCode = 400 ) {
        super( message );
        this.errors = this.serializeErrors();
        this.message = this.errors[ 0 ]?.message || this.message;
        Object.setPrototypeOf( this, RequestValidationError.prototype );
    }

    protected serializeErrors(): ValidationErrorInterface[] {
        try {
            return this.validationErrors.map( ( err ) => ( {
                message: err.msg,
                field: err.type === 'field' ? err.path : '',
            } ) );
        } catch ( e ) {
            return [];
        }
    }
}
