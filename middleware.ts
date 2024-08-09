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

  const res = NextResponse.next();

  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (
    apiRoutes(pathname) &&
    !validApiAccessToken(req.headers.get("access-token") ?? "")
  ) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return res;
}
