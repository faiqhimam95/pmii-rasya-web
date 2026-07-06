import "server-only";
import crypto from "crypto";

export const SESSION_COOKIE = "rasya_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 jam

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET belum diset.");
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function isValidAccessToken(token: string | undefined | null): boolean {
  const expected = process.env.ADMIN_ACCESS_TOKEN;
  if (!expected || !token) return false;
  return timingSafeEqual(token, expected);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  return timingSafeEqual(password, expected);
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  return timingSafeEqual(sign(payload), signature);
}
