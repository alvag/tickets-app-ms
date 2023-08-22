import express from 'express';
import appRoutes from './routes';

const app = express();
app.use( express.json() );

app.use( '/api', appRoutes );

app.listen( 3000, () => {
    console.log( 'Listening on port 3000!' );
} );
