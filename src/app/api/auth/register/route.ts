import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({error: 'Email already registered'}, {status: 400});
        }

        const hashed = await hashPassword(password);
        const newUser = await User.create({ name, email, password: hashed });

        const token = generateToken({id: newUser._id, role: newUser.role});

        const response = NextResponse.json({
            message: 'User registered and logged in',
            user: newUser.email
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        return response;
    } catch (error) {
        return NextResponse.json({error: 'Error registering user', details: (error as Error).message}, {status: 500});
    }
}