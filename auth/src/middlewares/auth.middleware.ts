import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors';
import { Jwt } from '../helpers';

export const isAuth = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        if ( !req.session?.jwt ) {
            throw new UnauthorizedError();
        }

        const { id, email } = Jwt.verify( req?.session?.jwt );
        req.user = { id, email };
        next();
    } catch ( error ) {
        next( error );
    }
};
