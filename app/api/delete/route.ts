import { NextRequest, NextResponse } from "next/server";
import { getFile, deleteFile } from "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json()
  const auth = req.headers.get('authorization');
  const { repo, filepath, message } = data;

  // Check if the file or folder exists
  const response = await getFile(repo, filepath, auth);
  let sha;
  if (response.status === 200) {
    const file = await response.json();
    sha = file.sha; // Get the SHA of the existing file or folder
  } else {
    return NextResponse.json({
      message: 'File or folder does not exist',
    });
  }

  // Delete the file or folder
  const deleteResponse = await deleteFile(repo, filepath, message, sha, auth);
  if (deleteResponse.status !== 200) {
    return deleteResponse;
  }

  return NextResponse.json({
    message: 'File or folder successfully deleted',
  });
}