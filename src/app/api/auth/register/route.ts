import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/bcrypt";

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

        return NextResponse.json({message: 'User registered', user: newUser.email});
    } catch {
        return NextResponse.json({error: 'Error registering user'}, {status: 500});
    }
}