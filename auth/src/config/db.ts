import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        const db = await mongoose.connect( 'mongodb://auth-mongo-srv:27017/tickets_app_auth' );
        console.log( `Conectado a la base de datos: ${ db.connection.name }` );
    } catch ( error ) {
        throw error;
    }
};
