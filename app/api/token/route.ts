import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json(content_type=None)

  const response = await getBearerToken(data.code)
  const token_data = await response.json()

  return NextResponse.json(token_data);
}
