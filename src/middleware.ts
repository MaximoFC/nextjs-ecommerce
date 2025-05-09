import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    
    try {
        const decoded = await verifyToken(token);

        if (typeof decoded === 'string') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        const role = decoded.role;
        const pathname = req.nextUrl.pathname;

        if(pathname.includes('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if(pathname.includes('/profile') && role !== 'user') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token: ', error)
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/profile']
}