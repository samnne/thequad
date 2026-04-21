// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const PUBLIC_ROUTES = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/listings/search",
];

// Suspicious patterns to block at the edge before they hit your routes
const INJECTION_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,           // SQL injection basics
  /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i, // XSS tag patterns
  /union[\s\+]+select/i,                        // SQL UNION attacks
  /exec(\s|\+)+(s|x)p\w+/i,                    // SQL exec
  /javascript:/i,                               // JS protocol
];

const isSuspicious = (val: string) =>
  INJECTION_PATTERNS.some((pattern) => pattern.test(decodeURIComponent(val)));

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ── Block suspicious URL paths ──────────────────────────────────────────────
  if (isSuspicious(pathname)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // ── Block suspicious query params ───────────────────────────────────────────
  for (const [, value] of searchParams.entries()) {
    if (isSuspicious(value)) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
  }

  // ── Skip public routes ───────────────────────────────────────────────────────
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublic) return NextResponse.next();

  // ── Only protect /api routes ────────────────────────────────────────────────
  if (!pathname.startsWith("/api")) return NextResponse.next();

  // ── Auth check ───────────────────────────────────────────────────────────────
  const userId = req.headers.get("authorization");

  if (!userId || !UUID_REGEX.test(userId)) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Missing or invalid user ID" },
      { status: 401 }
    );
  }

  // ── Forward sanitized user id as trusted header ──────────────────────────────
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", userId.toLowerCase()); // normalize UUID casing

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*"],
};