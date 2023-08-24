import { dbConnection } from './config/db';
import { app } from './app';

dbConnection()
    .then( () => {
        app.listen( 3000, () => {
            console.log( 'Server is running on port 3000' );
        } );
    } )
    .catch( ( error ) => {
        console.log( `Error al conectar a la base de datos: ${ error }` );
    } );
