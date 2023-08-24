import { Jwt } from '../helpers';
import { NextFunction, Request, Response } from 'express';

export const currentUser = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        if ( !req.session?.jwt ) {
            return next();
        }

        const { uid, email } = Jwt.verify( req?.session?.jwt );
        req.user = { uid, email };
    } catch ( error ) {
    }

    next();
};
