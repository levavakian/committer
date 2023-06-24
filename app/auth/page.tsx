import qs from 'qs';
import React from 'react';

export default async function Page({
  params,
  searchParams
}: {
  params: { };
  searchParams?: { [key: string]: string | string[] | undefined };
})
{
  // Define Github's OAuth endpoint.
  const githubAuthUrl = 'https://github.com/login/oauth/authorize';

  // Prepare the query parameters for Github OAuth.
  const githubAuthQuery = qs.stringify({
    client_id: process.env.GITHUB_CLIENT_ID, // Your Github App's Client ID
    scope: 'repo', // Replace this with the scopes you need
    state: searchParams?.redirect_uri, // Using client_id as the state to match requests and responses
    // redirect_uri: searchParams?.redirect_uri
    redirect_uri: `${process.env.SELF_URL}redirect`
  });

  // Navigate to Github's OAuth endpoint.
  const login = `${githubAuthUrl}?${githubAuthQuery}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f6f8fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        marginBottom: '50px',
        color: '#24292e'
      }}>
        Authorize with Github
      </h1>
      <a 
        href={login} 
        style={{
          display: 'inline-block',
          backgroundColor: '#24292e',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          textDecoration: 'none',
          fontSize: '14px',
          borderRadius: '5px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        <i style={{
          marginRight: '5px',
          border: 'solid white',
          borderWidth: '0 2px 2px 0',
          display: 'inline-block',
          padding: '3px',
          transform: 'rotate(-45deg)',
          verticalAlign: 'middle'
        }}></i>
        Continue to Github
      </a>
    </div>
  );
}
