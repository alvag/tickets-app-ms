import dotenv from 'dotenv';
import express from 'express';
import cookieSession from 'cookie-session';
import appRoutes from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './errors/not-found-error';
import { dbConnection } from './config/db';

dotenv.config();

const app = express();
app.set( 'trust proxy', true );
app.use( express.json() );
app.use( cookieSession( {
    signed: false,
    secure: true,
} ) );

app.use( '/api', appRoutes );

app.all( '*', ( req, res, next ) => {
    throw new NotFoundError();
} );

app.use( errorHandler );

dbConnection()
    .then( () => {
        app.listen( 3000, () => {
            console.log( 'Server is running on port 3000' );
        } );
    } )
    .catch( ( error ) => {
        console.log( `Error al conectar a la base de datos: ${ error }` );
    } );
