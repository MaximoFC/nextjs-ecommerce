import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const decoded = verifyToken(token);

        if (typeof decoded === 'string') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        const role = decoded.role;
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("admin") && role !== "admin") {
            return NextResponse.redirect(new URL('/', req.url));
        }

        if (pathname === '/profile' && role === 'admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/profile'],
}