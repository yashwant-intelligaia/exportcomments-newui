import { NextRequest, NextResponse } from "next/server";

/* Replaces the client-side PrivateRoute / AuthRoute guards so redirects happen before render. */
const PRIVATE_PREFIXES = ["/projects", "/users", "/invite", "/project"];
const AUTH_ONLY = ["/", "/callback"];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hasToken = Boolean(request.cookies.get("userToken")?.value);
    const isPrivate = PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

    if (isPrivate && !hasToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (hasToken && AUTH_ONLY.includes(pathname)) {
        return NextResponse.redirect(new URL("/projects", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|api|.*\\..*).*)"],
};
