
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
