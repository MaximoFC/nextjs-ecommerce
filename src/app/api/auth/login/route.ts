import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return NextResponse.json({error: 'Invalid password'}, {status: 401});
        }

        const token: string = generateToken({ id: user._id, role: user.role});

        const response = NextResponse.json({
            message: 'Login successful', 
            user: user.email
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
        return NextResponse.json({message: 'Error logging in', details: (error as Error).message}, {status:500});
    }
}