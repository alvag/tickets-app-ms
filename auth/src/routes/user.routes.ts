import { Router } from 'express';
import { getCurrentUser, signIn, signOut, signUp } from '../controllers/user.controller';
import { body } from 'express-validator';

const router = Router();

router.get( '/current-user', getCurrentUser );

router.post( '/signup', [
        body( 'email' ).isEmail().withMessage( 'Email must be valid' ),
        body( 'password' ).trim().isLength( {
            min: 4,
            max: 20,
        } ).withMessage( 'Password must be between 4 and 20 characters' ),
    ],
    signUp,
);

router.post( '/signin', signIn );

router.post( '/signout', signOut );

export default router;
