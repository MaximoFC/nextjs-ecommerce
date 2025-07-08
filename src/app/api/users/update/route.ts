import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (typeof decoded === 'string') {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await connectDB();

        const body = await req.json();
        const { name, email, address } = body;

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            {
                name,
                email,
                address
            },
            { new: true, runValidators: true, select: '-password' }
        );

        return NextResponse.json({ user: updatedUser })
    } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 });
    }
}