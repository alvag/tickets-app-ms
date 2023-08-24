import request from 'supertest';
import { app } from '../../app';

describe( 'signUp tests', () => {
    it( 'returns a 201 on successful signup', async () => {
        return request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );
    } );

    it( 'returns a 400 with an invalid email', async () => {
        return request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'testtest.com',
                password: 'password',
            } )
            .expect( 400 );
    } );

    it( 'returns a 400 with an invalid password', async () => {
        return request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'p',
            } )
            .expect( 400 );
    } );

    it( 'returns a 400 with missing email and password', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@email.com',
            } )
            .expect( 400 );

        await request( app )
            .post( '/api/users/signup' )
            .send( {
                password: 'password',
            } )
            .expect( 400 );
    } );

    it( 'disallows duplicate emails', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 400 );
    } );

    it( 'sets a cookie after successful signup', async () => {
        const response = await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        expect( response.get( 'Set-Cookie' ) ).toBeDefined();
    } );
} );

describe( 'signIn tests', () => {
    it( 'returns a 400 with an invalid email', async () => {
        return request( app )
            .post( '/api/users/signin' )
            .send( {
                email: 'testtest.com',
                password: 'password',
            } )
            .expect( 400 );
    } );

    it( 'returns a 400 with invalid params', async () => {
        return request( app )
            .post( '/api/users/signin' )
            .send( {} )
            .expect( 400 );
    } );

    it( 'returns 400 when email not exists', async () => {
        await request( app )
            .post( '/api/users/signin' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 400 );
    } );

    it( 'returns 400 when password is invalid', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        await request( app )
            .post( '/api/users/signin' )
            .send( {
                email: 'test@test.com',
                password: 'passwor',
            } )
            .expect( 400 );
    } );

    it( 'returns 200 when signin successfully', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        await request( app )
            .post( '/api/users/signin' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 200 );
    } );

    it( 'sets a cookie after successful signin', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        const response = await request( app )
            .post( '/api/users/signin' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 200 );

        expect( response.get( 'Set-Cookie' ) ).toBeDefined();
        expect( response.body.email ).toBeDefined();
        expect( response.body.id ).toBeDefined();
    } );
} );

describe( 'signOut tests', () => {
    it( 'returns 200 when signout successfully', async () => {
        await request( app )
            .post( '/api/users/signup' )
            .send( {
                email: 'test@test.com',
                password: 'password',
            } )
            .expect( 201 );

        const response = await request( app )
            .post( '/api/users/signout' )
            .send()
            .expect( 200 );

        expect( response.get( 'Set-Cookie' )[ 0 ] ).toEqual( 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=none; httponly' );
    } );
} );

describe( 'getCurrentUser tests', () => {
    it( 'returns user details when user is signed in', async () => {
        const cookie = await global.signin();

        const response = await request( app )
            .get( '/api/users/me' )
            .set( 'Cookie', cookie )
            .send()
            .expect( 200 );

        expect( response.body.user.email ).toEqual( 'test@test.com' );
        expect( response.body.user.id ).toBeDefined();
    } );

    it( 'returns null when user is not signed in', async () => {
        const response = await request( app )
            .get( '/api/users/me' )
            .send()
            .expect( 200 );

        expect( response.body.user ).toBeNull();
    } );
} );
