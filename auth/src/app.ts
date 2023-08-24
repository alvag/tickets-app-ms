import dotenv from 'dotenv';
import express from 'express';
import cookieSession from 'cookie-session';
import appRoutes from './routes';
import { errorHandler } from './middlewares';
import { NotFoundError } from './errors';

dotenv.config();

const app = express();
app.set( 'trust proxy', true );
app.use( express.json() );
app.use( cookieSession( {
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
} ) );

app.use( '/api', appRoutes );

app.all( '*', ( req, res, next ) => {
    throw new NotFoundError();
} );

app.use( errorHandler );

export { app };
