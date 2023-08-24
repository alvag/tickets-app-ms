import dotenv from 'dotenv';
import express from 'express';
import cookieSession from 'cookie-session';
import cors from 'cors';
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
    sameSite: 'none',
} ) );

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: [ 'set-cookie' ],
};

app.use( cors( corsOptions ) );
app.options( '*', cors( corsOptions ) );

app.use( '/api', appRoutes );

app.all( '*', ( req, res, next ) => {
    throw new NotFoundError();
} );

app.use( errorHandler );

export { app };
