import { MiddlewareConfigType } from "./types";
import { NextRequest, NextResponse } from "next/server";

export const config: MiddlewareConfigType = {
  matcher: ["/api/:path*"],
};

const apiRoutes = (pathname: string) => {
  return pathname.startsWith("/api/redis");
};

const validApiAccessToken = (token: string) => {
  return token === (process.env.API_ACCESS_TOKEN as string);
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    apiRoutes(pathname) &&
    !validApiAccessToken(req.headers.get("access-token") ?? "")
  ) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.next();
}
