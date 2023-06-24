import { NextRequest, NextResponse } from "next/server";
import { getFile, putFile } from "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json()
  const auth = req.headers.get('authorization');
  const { repo, filepath, message, content } = data;

  // Check if the file already exists
  const response = await getFile(repo, filepath, auth);
  let sha;
  if (response.status === 200) {
    const file = await response.json();
    sha = file.sha; // Get the SHA of the existing file
  }

  // Create or update the file
  const putResponse = await putFile(repo, filepath, message, content, sha, auth);
  if (putResponse.status !== 201 && putResponse.status != 200) {
    return putResponse;
  }

  return NextResponse.json({
    message: 'File successfully created or updated',
  });
}