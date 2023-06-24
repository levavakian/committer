import { NextRequest, NextResponse } from "next/server";
import { getUser } from  "@/app/lib/utils"

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const response = await getUser(auth);
  if (response.status != 200) {
    return response
  }

  const user_data = await response.json()
  return NextResponse.json({
    username: user_data.login,
  });
}
