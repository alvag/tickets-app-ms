import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler: ErrorRequestHandler = ( error: Error, req: Request, res: Response, next: NextFunction ) => {
    if ( error instanceof CustomError ) {
        let { message, errors, statusCode } = error;
        return res.status( statusCode ).json( { message, errors, statusCode } );
    }

    res.status( 500 ).json( {
        message: 'Internal server error',
        statusCode: 500,
    } );
};
