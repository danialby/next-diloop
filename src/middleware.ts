// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.includes('/dashboard') || pathname.includes('/admin-panel')) {
        const token = request.cookies.get('auth_token');
        console.log(token)
        if (!token) {
            return Response.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/dashboard', '/admin-panel'],
}
