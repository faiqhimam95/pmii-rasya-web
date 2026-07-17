import "server-only";
import { cache } from "react";
import postgres from "postgres";
import { DEFAULT_CONTENT } from "./default-content";
import type { SiteContent } from "./types";

function getConnectionString(): string {
  const url =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL;
  if (!url) {
    throw new Error(
      "Tidak ada koneksi database. Set POSTGRES_URL (atau DATABASE_URL) di .env.local / pengaturan environment Vercel."
    );
  }
  return url;
}

let sqlClient: ReturnType<typeof postgres> | null = null;

function getSql() {
  if (!sqlClient) {
    const connectionString = getConnectionString();
    sqlClient = postgres(connectionString, {
      ssl: "require",
      max: 1,
    });
  }
  return sqlClient;
}

let tableReady: Promise<void> | null = null;

async function ensureTable() {
  if (!tableReady) {
    const sql = getSql();
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS rasya_site_content (
        id smallint PRIMARY KEY,
        data jsonb NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `.then(() => undefined);
  }
  return tableReady;
}

/**
 * Reads the site content from Postgres, seeding it with DEFAULT_CONTENT on
 * first run. Wrapped in React's `cache()` so multiple components reading
 * content within the same request/render share one DB round trip.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  await ensureTable();
  const sql = getSql();
  const rows = await sql<{ data: string | SiteContent }[]>`
    SELECT data FROM rasya_site_content WHERE id = 1
  `;
  if (rows.length > 0) {
    const raw = rows[0].data;
    const parsed = typeof raw === "string" ? (JSON.parse(raw) as SiteContent) : raw;
    return { ...DEFAULT_CONTENT, ...parsed };
  }
  await sql`
    INSERT INTO rasya_site_content (id, data) VALUES (1, ${JSON.stringify(DEFAULT_CONTENT)}::jsonb)
    ON CONFLICT (id) DO NOTHING
  `;
  return DEFAULT_CONTENT;
});

export async function saveContent(content: SiteContent): Promise<void> {
  await ensureTable();
  const sql = getSql();
  const json = JSON.stringify(content);
  await sql`
    INSERT INTO rasya_site_content (id, data, updated_at)
    VALUES (1, ${json}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET data = ${json}::jsonb, updated_at = now()
  `;
}
