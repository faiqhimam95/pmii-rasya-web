import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SESSION_COOKIE, isValidAccessToken, verifySessionToken } from "@/lib/auth";
import { getContent } from "@/lib/content-store";
import ContentEditor from "@/components/admin/ContentEditor";

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!isValidAccessToken(token)) notFound();

  const cookieStore = await cookies();
  if (!verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect(`/admin/${token}`);
  }

  const content = await getContent();

  return <ContentEditor token={token} initialContent={content} />;
}
