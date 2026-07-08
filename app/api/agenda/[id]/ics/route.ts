import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content-store";
import { allAgendaWithBidang } from "@/lib/content-helpers";
import { buildAgendaIcs } from "@/lib/ics";

// Serves the .ics inline (no Content-Disposition: attachment) so mobile
// browsers hand off straight to the native calendar app instead of just
// downloading a file the visitor has to open manually.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dateParam = request.nextUrl.searchParams.get("date");
  const match = dateParam?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return NextResponse.json({ error: "Parameter date tidak valid." }, { status: 400 });
  }
  const [, y, m, d] = match;
  const date = new Date(Number(y), Number(m) - 1, Number(d));

  const content = await getContent();
  const found = allAgendaWithBidang(content.bidang).find(({ agenda }) => agenda.id === id);
  if (!found) {
    return NextResponse.json({ error: "Agenda tidak ditemukan." }, { status: 404 });
  }

  const ics = buildAgendaIcs(found.agenda, found.bidang, date);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8; method=PUBLISH",
      "Content-Disposition": `inline; filename="${found.agenda.id}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
