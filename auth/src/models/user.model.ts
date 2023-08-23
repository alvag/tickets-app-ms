import { Document, Model, model, Schema } from 'mongoose';

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
} );

userSchema.statics.build = ( attrs: UserAttrs ) => {
    return new User( attrs );
};

const User = model<UserDocument, UserModel>( 'User', userSchema );

export { User };
