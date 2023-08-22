import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const getCurrentUser = async ( req: Request, res: Response ) => {
    res.json( {
        message: 'getCurrentUser',
    } );
};

export const signUp = async ( req: Request, res: Response ) => {
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
            errors: errors.array(),
        } );
    }

    const { email, password } = req.body;

    res.json( {
        email,
        password,
    } );
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
