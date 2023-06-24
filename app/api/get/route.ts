import { NextRequest, NextResponse } from "next/server";
import { getFile } from  "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json()
  const auth = req.headers.get('authorization');
  const repo = data.repo
  const filepath = data.filepath

  const response = await getFile(repo, filepath, auth);
  console.log(response)
  if (response.status != 200) {
    return response
  }

  const file = await response.json()
  const decodedData = Buffer.from(file.content, 'base64').toString('utf8');

  return NextResponse.json({
    fileData: decodedData,
  });
}
