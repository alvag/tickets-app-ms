import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError, RequestValidationError } from '../errors';

export const errorHandler: ErrorRequestHandler = ( error: Error, req: Request, res: Response, next: NextFunction ) => {
    console.log( `${ error.name }: ${ error.message }` );


    if ( error instanceof RequestValidationError ) {
        let { message, errors, statusCode } = error;
        return res.status( statusCode ).json( { message, errors, statusCode } );
    }

    if ( error instanceof CustomError ) {
        let { message, statusCode } = error;
        return res.status( statusCode ).json( { message, statusCode } );
    }

    res.status( 500 ).json( {
        message: 'Internal server error',
        statusCode: 500,
    } );
};
