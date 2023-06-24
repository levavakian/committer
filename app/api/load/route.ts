import { NextRequest, NextResponse } from "next/server";
import { getReadme, getTree } from "@/app/lib/utils"

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json()
  const auth = req.headers.get('authorization');
  const { repo } = data;

  // Get the README
  const readmeResponse = await getReadme(repo, auth);
  let readme;
  if (readmeResponse.status === 200) {
    const file = await readmeResponse.json();
    readme = Buffer.from(file.content, 'base64').toString('utf8');
  }

  // Get the directory tree
  // Get the directory tree
  const treeResponse = await getTree(repo, auth);
  let tree;
  if (treeResponse.status === 200) {
    tree = await treeResponse.text();
  }

  return NextResponse.json({
    readme,
    tree,
  });
}