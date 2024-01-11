import { NextRequest, NextResponse } from "next/server";
import { getBearerToken } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  console.warn(req)
  // Get the request body as text
  const text = await req.text();

  // Parse the text as JSON
  const body = JSON.parse(text);

  // Access the 'code' field from the parsed body
  const code = body.code;

  console.warn(code)
  const response = await getBearerToken(dcode)
  console.warn(response)
  const token_data = await response.json()
  console.warn(token_data)

  return NextResponse.json(token_data);
}
