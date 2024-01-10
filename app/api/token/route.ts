import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  console.warn(req)
  console.warn(await req.text())
  const data = await req.json()

  const response = await getBearerToken(data.code)
  const token_data = await response.json()

  return NextResponse.json(token_data);
}
