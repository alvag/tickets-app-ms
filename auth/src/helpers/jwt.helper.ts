import jwt from 'jsonwebtoken';

export class Jwt {
    static create( uid: string, email: string ) {
        return jwt.sign(
            {
                uid,
                email,
            },
            process.env.TOKEN_SECRET_KEY!,
            { expiresIn: process.env.TOKEN_EXPIRES },
        );
    }

    static verify( token: string ) {
        try {
            const payload = jwt.verify( token, process.env.TOKEN_SECRET_KEY! );
            return payload as { uid: string, email: string };
        } catch ( error ) {
            throw error;
        }
    }
}
