import type { Agenda, Bidang, SiteContent } from "./types";
import { earliestNext } from "./schedule";

export function getBidang(content: SiteContent, slug: string): Bidang | undefined {
  return content.bidang.find((b) => b.slug === slug);
}

export function allAgendaWithBidang(bidang: Bidang[]): { bidang: Bidang; agenda: Agenda }[] {
  return bidang.flatMap((b) => b.agenda.map((agenda) => ({ bidang: b, agenda })));
}

export interface UpcomingItem {
  bidang: Bidang;
  agenda: Agenda;
  date: Date;
}

/** Agenda items with a computable next date, soonest first. */
export function getUpcoming(bidang: Bidang[], from: Date): UpcomingItem[] {
  const items = allAgendaWithBidang(bidang)
    .map(({ bidang: b, agenda }) => {
      const date = earliestNext(agenda.jadwal, from);
      return date ? { bidang: b, agenda, date } : null;
    })
    .filter((x): x is UpcomingItem => x !== null);
  items.sort((a, b) => a.date.getTime() - b.date.getTime());
  return items;
}

/** Agenda items whose schedule is too loose to place on a calendar/countdown. */
export function getKegiatanRutin(bidang: Bidang[]): { bidang: Bidang; agenda: Agenda }[] {
  return allAgendaWithBidang(bidang).filter(({ agenda }) =>
    agenda.jadwal.every((r) => r.type === "text")
  );
}
