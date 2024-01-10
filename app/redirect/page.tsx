import { redirect } from 'next/navigation'

export default async function Page({
  params,
  searchParams
}: {
  params: { };
  searchParams?: { [key: string]: string | string[] | undefined };
})
{
  const redirect_uri = `${searchParams?.state}&code=${searchParams?.code}`
  redirect(redirect_uri);
}
