import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const data = {
    "schema_version": "v1",
    "name_for_model": "CommitterGPT",
    "name_for_human": "CommitterGPT",
    "description_for_human": "Read, create, modify and delete files from github repos.",
    "description_for_model": "Use the CommitterGPT plugin to interact with Github repos. You can use it to read files, read the directory tree of the repo, create new files, overwrite existing files, append to existing files, and delete files. All operations are done with commits so they are non-destructive.",
    "api": {
      "type": "openapi",
      "url": `${process.env.SELF_URL}.well-known/openapi.json`,
      "has_user_authentication": false
    },
    "auth": {
      "type": "oauth",
      "client_url": `${process.env.SELF_URL}auth`,
      "scope": "repo",
      "authorization_url": `${process.env.SELF_URL}api/token`,
      "authorization_content_type": "application/json",
      "verification_tokens": {
          "openai": "24a23b0844e440de97988cdfb5019259"
      }
    },
    "logo_url": `${process.env.SELF_URL}logo.png`,
    "contact_email": "levavakian@gmail.com",
    "legal_info_url": `${process.env.SELF_URL}legal`
  }
  return NextResponse.json(data);
}
