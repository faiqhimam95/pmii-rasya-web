import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SESSION_COOKIE, isValidAccessToken, verifySessionToken } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!isValidAccessToken(token)) notFound();

  const cookieStore = await cookies();
  if (verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect(`/admin/${token}/dashboard`);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--background)] px-4 py-16">
      <LoginForm token={token} />
    </div>
  );
}
