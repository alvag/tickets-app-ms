import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { Jwt, Password } from '../helpers';
import { BadRequestError, InternalServerError } from '../errors';


export const getCurrentUser = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        res.json( { user: req.user || null } );
    } catch ( e ) {
        next( e );
    }
};

export const signUp = async ( req: Request, res: Response, next: NextFunction ) => {
    try {

        const { email, password } = req.body;

        const user = User.build( { email, password } );
        await user.save();

        const token = Jwt.create( user._id, email );

        req.session = {
            jwt: token,
        };

        res.status( 201 ).json( user );
    } catch ( e ) {
        next( e );
    }
};

export const signIn = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne( { email } );

        if ( !user ) {
            throw new BadRequestError( 'Invalid credentials' );
        }

        const isMatch = await Password.compare( user.password, password );
        if ( !isMatch ) {
            throw new BadRequestError( 'Invalid credentials' );
        }

        const token = Jwt.create( user._id, email );

        req.session = {
            jwt: token,
        };

        res.json( user );
    } catch ( e ) {
        next( e );
    }
};

export const signOut = async ( req: Request, res: Response ) => {
    try {
        req.session = null;

        res.json( { message: 'Sign out successfully' } );
    } catch ( error ) {
        throw new InternalServerError();
    }
};


