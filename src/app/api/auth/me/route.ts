import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = (await cookieStore).get('token')?.value;

        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        const decoded = verifyToken(token);

        if (typeof decoded === 'string') {
            return NextResponse.json({error: 'Invalid token'}, {status: 401});
        }

        await connectDB();

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }

        return NextResponse.json({user});
    } catch {
        return NextResponse.json({error: 'Invalid token'}, {status: 401});
    }
}