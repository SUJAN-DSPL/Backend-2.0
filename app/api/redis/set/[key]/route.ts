import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { key: string } }
) {
  const redis = new Redis({
    url: process.env.REDIS_URL as string,
    token: process.env.REDIS_TOKEN as string,
  });

  try {
    const data = await request.json();
    const redisResponse = await redis.set(params.key, data, {ex: 60 * 60 * 24 * 5});
    return NextResponse.json({ status: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Redis Internal Server Error" },
      { status: 500 }
    );
  }
}
