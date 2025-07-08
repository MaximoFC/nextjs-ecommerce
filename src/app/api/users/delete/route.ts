import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = await verifyToken(token);
        if (typeof decoded === "string") {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        await connectDB();

        await User.findByIdAndDelete(decoded.id);

        const res = NextResponse.json({ message: 'User deleted' });
        res.cookies.set("token", "", { maxAge: 0 });

        return res;
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}