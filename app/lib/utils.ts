function standardHeaders(auth: string | null) : Record<string, string> {
  const headers: Record<string, string> = { 'Accept': 'application/vnd.github.v3+json' };
  if (auth) {
    headers['Authorization'] = auth;
  }

  return headers;
}

export async function getFile(repo: string, file: string, auth: string | null) {
  const headers = standardHeaders(auth);
  console.log("pre", repo, file, `https://api.github.com/repos/${repo}/contents/${file}`)
  return fetch(
    `https://api.github.com/repos/${repo}/contents/${file}`,
    { headers, next: { revalidate: 60 } }
  );
}

export async function putFile(repo: string, file: string, message: string, content: string, sha: string | undefined, auth: string | null) {
  const headers = standardHeaders(auth);
  const body: { [key: string]: string } = {
    message,
    content: Buffer.from(content).toString('base64'),
  };
  if (sha) {
    body['sha'] = sha; // Include the SHA if the file already exists
  }
  return fetch(
    `https://api.github.com/repos/${repo}/contents/${file}`,
    { method: 'PUT', headers, body: JSON.stringify(body) }
  );
}

export async function appendFile(repo: string, file: string, message: string, content: string, sha: string | undefined, auth: string | null) {
  const headers = standardHeaders(auth);
  const body: { [key: string]: string } = {
    message,
    content: Buffer.from(content).toString('base64'),
  };
  if (sha) {
    body['sha'] = sha; // Include the SHA if the file already exists
  }
  return fetch(
    `https://api.github.com/repos/${repo}/contents/${file}`,
    { method: 'PUT', headers, body: JSON.stringify(body) }
  );
}

export async function getUser(auth: string | null) {
  const headers = standardHeaders(auth);
  return fetch(
    `https://api.github.com/user`,
    { headers, next: { revalidate: 60 } }
  );
}

export async function deleteFile(repo: string, file: string, message: string, sha: string, auth: string | null) {
  const headers = standardHeaders(auth);
  const body: { [key: string]: string } = {
    message,
    sha,
  };
  return fetch(
    `https://api.github.com/repos/${repo}/contents/${file}`,
    { method: 'DELETE', headers, body: JSON.stringify(body) }
  );
}

export async function getReadme(repo: string, auth: string | null) {
  const headers = standardHeaders(auth);
  return fetch(
    `https://api.github.com/repos/${repo}/contents/README.md`,
    { headers }
  );
}

export async function getTree(repo: string, auth: string | null): Promise<Response> {
  const headers = standardHeaders(auth);
  
  // Get the repository information to find the default branch
  const repoResponse = await fetch(
    `https://api.github.com/repos/${repo}`,
    { headers }
  );

  if (!repoResponse.ok) {
    return new Response(`Failed to fetch repository information: ${repoResponse.statusText}`, { status: 404 });
  }

  const repoData: { default_branch: string } = await repoResponse.json();
  const defaultBranch = repoData.default_branch;

  // Fetch the tree of the default branch
  const treeResponse = await fetch(
    `https://api.github.com/repos/${repo}/git/trees/${defaultBranch}?recursive=1`,
    { headers }
  );

  if (!treeResponse.ok) {
    return new Response(`Failed to fetch directory tree: ${treeResponse.statusText}`, { status: 404 });
  }

  const treeData: { tree: { path: string }[] } = await treeResponse.json();

  // Convert the flat list of files into a string
  const tree = treeData.tree
    .map(item => item.path)
    .sort()
    .join('\n');

  return new Response(tree, { status: 200 });
}

export async function getBearerToken(code: string) {
  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: code,
  }

  const request = new Request(`https://github.com/login/oauth/access_token`, {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    method: 'POST'
  });

  return fetch(request)
}
