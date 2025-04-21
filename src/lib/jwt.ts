import { JWTPayload, jwtVerify, SignJWT } from "jose";


const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const secret = new TextEncoder().encode(JWT_SECRET);

interface MyTokenPayload extends JWTPayload {
    id: string,
    role: string
}

export const generateToken = async (payload: MyTokenPayload) => {
    const alg = 'HS256';

    const jwt = new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret);

    return jwt;
};

export const verifyToken = async (token: string): Promise<MyTokenPayload> => {
    try {
        const { payload } = await jwtVerify<MyTokenPayload>(token, secret);
        return payload;
    } catch (error) {
        console.error("Error verifying token: ", error);
        throw new Error("Invalid token");
    }
}