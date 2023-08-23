import { Document, Model, model, Schema } from 'mongoose';
import { Password } from '../helpers';
import { BadRequestError } from '../errors/bad-request-error';

interface UserAttrs {
    email: string;
    password: string;
}

interface UserDocument extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDocument> {
    build( attrs: UserAttrs ): UserDocument;
}

const userSchema = new Schema( {
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
} );

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.uid = user._id;
    delete user.password;
    delete user._id;
    return user;
};

userSchema.statics.build = ( attrs: UserAttrs ) => {
    return new User( attrs );
};

userSchema.pre( 'save', async function ( next ) {
    const user = await User.exists( { email: this.email } );
    if ( user ) {
        throw new BadRequestError( 'Email is already in use' );
    }

    if ( this.isModified( 'password' ) ) {
        this.password = await Password.hash( this.password );
    }

    next();
} );

userSchema.pre( 'findOneAndUpdate', async function ( next ) {
    if ( this.get( 'password' ) ) {
        this.set( 'password', await Password.hash( this.get( 'password' ) ) );
    }
    next();
} );

const User = model<UserDocument, UserModel>( 'User', userSchema );

export { User };
