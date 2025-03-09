// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(request)

    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('auth_token');
        console.log(token)
        if (!token) {
            return Response.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/dashboard'],
}
