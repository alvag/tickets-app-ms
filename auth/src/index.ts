import express from 'express';
import appRoutes from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.use( express.json() );

app.use( '/api', appRoutes );

app.all( '*', ( req, res, next ) => {
    throw new NotFoundError();
} );

app.use( errorHandler );


app.listen( 3000, () => {
    console.log( 'Listening on port 3000!' );
} );
