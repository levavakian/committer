import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")!

  const response = await getBearerToken(code)
  const token_data = await response.json()
  console.warn(token_data)

  return NextResponse.json(token_data);
}
