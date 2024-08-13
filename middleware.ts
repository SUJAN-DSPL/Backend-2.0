// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:8000"]; // Add more origins if needed

const apiRoutes = (pathname: string) => {
  return pathname.startsWith("/api/redis");
};

const validApiAccessToken = (token: string) => {
  return token === (process.env.API_ACCESS_TOKEN as string);
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const origin = request.headers.get("Origin");

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, access-token"
  );

  if (request.method === "OPTIONS") {
    // response.status = 204; // No content
    return response;
  }

  const { pathname } = request.nextUrl;

  if (
    apiRoutes(pathname) &&
    !validApiAccessToken(request.headers.get("access-token") ?? "")
  ) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*", // Adjust to apply middleware to the correct routes
};
