import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user.model';


export const getCurrentUser = async ( req: Request, res: Response ) => {
    res.json( {
        message: 'getCurrentUser',
    } );
};

export const signUp = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const errors = validationResult( req );

        if ( !errors.isEmpty() ) {
            throw new RequestValidationError( errors.array() );
        }

        const { email, password } = req.body;

        const user = User.build( { email, password } );
        await user.save();

        res.status( 201 ).json( user );
    } catch ( e ) {
        next( e );
    }
};

export const signIn = async ( req: Request, res: Response ) => {
    res.json( {
        message: 'signIn',
    } );
};

export const signOut = async ( req: Request, res: Response ) => {
    res.json( {
        message: 'signOut',
    } );
};


