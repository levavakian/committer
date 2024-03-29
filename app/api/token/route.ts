import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const text = await req.text()
  const params = new URLSearchParams(text)
  const code = params.get('code')!
  
  const response = await getBearerToken(code)
  const token_data = await response.json()

  return NextResponse.json(token_data);
}
