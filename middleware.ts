import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/lib";

export default async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    if (pathname.startsWith("/listing/")){
        const isAuth = request.cookies.get("session")?.value;
        if (!isAuth){
            const loginURL = new URL("/sign-up", request.url)
            return NextResponse.redirect(loginURL)
        }

    }
    
    return await updateSession(request)
}

export const config = {
  matcher: [
    '/account/:path*', // Matches /dashboard, /dashboard/settings, etc.
    // '/', // Matches secure API routes
  ],
};