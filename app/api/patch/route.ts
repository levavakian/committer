import { NextRequest, NextResponse } from "next/server";
import { getFile, appendFile } from "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json()
  const auth = req.headers.get('authorization');
  const { repo, filepath, message, content } = data;

  // Check if the file already exists
  const response = await getFile(repo, filepath, auth);
  let sha;
  let existingContent = '';
  if (response.status === 200) {
    const file = await response.json();
    sha = file.sha; // Get the SHA of the existing file
    existingContent = Buffer.from(file.content, 'base64').toString('utf8');
  }

  // Append to the file
  const newContent = existingContent + content;
  const appendResponse = await appendFile(repo, filepath, message, newContent, sha, auth);
  if (appendResponse.status !== 201) {
    return appendResponse;
  }

  return NextResponse.json({
    message: 'Content successfully appended to file',
  });
}