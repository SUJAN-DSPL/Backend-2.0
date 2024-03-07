import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const redis = new Redis({
    url: process.env.REDIS_URL as string,
    token: process.env.REDIS_TOKEN as string,
  });

  try {
    const value = await redis.get(params.key);
    return NextResponse.json({ status: true, value: value }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Redis Internal Server Error" },
      { status: 500 }
    );
  }
}
