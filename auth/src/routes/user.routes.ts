import { Router } from 'express';
import { getCurrentUser, signIn, signOut, signUp } from '../controllers/user.controller';
import { body } from 'express-validator';
import { currentUser, validateRequest } from '../middlewares';

const router = Router();

router.get( '/me', [ currentUser ], getCurrentUser );

router.post( '/signup', [
        body( 'email' ).isEmail().withMessage( 'Email must be valid' ),
        body( 'password' ).trim().isLength( {
            min: 4,
            max: 20,
        } ).withMessage( 'Password must be between 4 and 20 characters' ),
        validateRequest,
    ],
    signUp,
);

router.post( '/signin', [
        body( 'email' ).isEmail().withMessage( 'Email must be valid' ),
        body( 'password' ).trim().notEmpty().withMessage( 'Password is required' ),
        validateRequest,
    ], signIn,
);

router.post( '/signout', signOut );

export default router;
