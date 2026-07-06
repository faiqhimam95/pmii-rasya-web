import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, isValidAccessToken, verifySessionToken } from "@/lib/auth";
import { saveContent } from "@/lib/content-store";
import type { SiteContent } from "@/lib/types";

function isSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.org === "object" &&
    typeof v.visi === "string" &&
    Array.isArray(v.misi) &&
    typeof v.sambutan === "object" &&
    Array.isArray(v.tupoksiKetuaUmum) &&
    typeof v.pengurusInti === "object" &&
    Array.isArray(v.bidang) &&
    (v.bidang as unknown[]).every(
      (b) =>
        b &&
        typeof b === "object" &&
        typeof (b as Record<string, unknown>).slug === "string" &&
        typeof (b as Record<string, unknown>).nama === "string" &&
        Array.isArray((b as Record<string, unknown>).pimpinan) &&
        Array.isArray((b as Record<string, unknown>).anggota) &&
        Array.isArray((b as Record<string, unknown>).tupoksi) &&
        Array.isArray((b as Record<string, unknown>).agenda)
    )
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";

  if (!isValidAccessToken(token)) {
    return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });
  }

  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(session)) {
    return NextResponse.json({ error: "Sesi tidak valid, silakan login ulang." }, { status: 401 });
  }

  if (!isSiteContent(body?.content)) {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  await saveContent(body.content);
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
