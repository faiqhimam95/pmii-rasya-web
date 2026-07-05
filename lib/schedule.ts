// Helpers for working with the organization's recurring & one-off event schedules.

export type JadwalRule =
  | { type: "once"; start: string; end?: string } // ISO dates, e.g. "2026-04-18"
  | { type: "weekly"; dayOfWeek: number } // 0 = Minggu ... 6 = Sabtu
  | { type: "monthlyWeek"; week: number; dayOfWeek: number } // week: 1-4, or -1 for last occurrence in month
  | { type: "text" }; // schedule too vague to place on a calendar (e.g. "Kondisional")

export const HARI = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export const BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function atMidnight(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${BULAN[m - 1]} ${y}`;
}

export function formatRentang(start: string, end?: string): string {
  if (!end || end === start) return formatTanggal(start);
  const [ys, ms, ds] = start.split("-").map(Number);
  const [ye, me, de] = end.split("-").map(Number);
  if (ys === ye && ms === me) {
    return `${ds}-${de} ${BULAN[ms - 1]} ${ys}`;
  }
  if (ys === ye) {
    return `${ds} ${BULAN[ms - 1]} - ${de} ${BULAN[me - 1]} ${ys}`;
  }
  return `${formatTanggal(start)} - ${formatTanggal(end)}`;
}

/** All matches of `dayOfWeek` within a given month. */
function weekdaysInMonth(year: number, month: number, dayOfWeek: number): Date[] {
  const out: Date[] = [];
  const d = new Date(year, month, 1);
  while (d.getMonth() === month) {
    if (d.getDay() === dayOfWeek) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function nthWeekdayOfMonth(year: number, month: number, week: number, dayOfWeek: number): Date | null {
  const matches = weekdaysInMonth(year, month, dayOfWeek);
  if (matches.length === 0) return null;
  if (week === -1) return matches[matches.length - 1];
  return matches[week - 1] ?? null;
}

/** Every concrete date `rule` lands on within the given month (for calendar rendering). */
export function occurrencesInMonth(rule: JadwalRule, year: number, month: number): Date[] {
  if (rule.type === "text") return [];

  if (rule.type === "once") {
    const start = new Date(rule.start + "T00:00:00");
    const end = rule.end ? new Date(rule.end + "T00:00:00") : start;
    const out: Date[] = [];
    const d = new Date(start);
    while (d <= end) {
      if (d.getFullYear() === year && d.getMonth() === month) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }

  if (rule.type === "weekly") {
    return weekdaysInMonth(year, month, rule.dayOfWeek);
  }

  // monthlyWeek
  const match = nthWeekdayOfMonth(year, month, rule.week, rule.dayOfWeek);
  return match ? [match] : [];
}

/** Soonest future (or ongoing) occurrence of a rule, relative to `from`. */
export function nextOccurrence(rule: JadwalRule, from: Date): Date | null {
  const today = atMidnight(from);

  if (rule.type === "text") return null;

  if (rule.type === "once") {
    const start = atMidnight(new Date(rule.start + "T00:00:00"));
    const end = rule.end ? atMidnight(new Date(rule.end + "T00:00:00")) : start;
    if (today <= end) return today > start ? today : start; // ongoing counts as "now"
    return null;
  }

  if (rule.type === "weekly") {
    const d = new Date(today);
    for (let i = 0; i < 7; i++) {
      if (d.getDay() === rule.dayOfWeek) return d;
      d.setDate(d.getDate() + 1);
    }
    return null;
  }

  // monthlyWeek: check this month then next month
  for (let offset = 0; offset < 2; offset++) {
    const y = today.getFullYear();
    const m = today.getMonth() + offset;
    const match = nthWeekdayOfMonth(y, m, rule.week, rule.dayOfWeek);
    if (match && match >= today) return match;
  }
  return null;
}

/** Earliest next occurrence across a list of rules. */
export function earliestNext(rules: JadwalRule[], from: Date): Date | null {
  let best: Date | null = null;
  for (const r of rules) {
    const n = nextOccurrence(r, from);
    if (n && (!best || n < best)) best = n;
  }
  return best;
}

export function diffHari(target: Date, from: Date): number {
  const a = atMidnight(from).getTime();
  const b = atMidnight(target).getTime();
  return Math.round((b - a) / 86400000);
}

export function labelHariLagi(n: number): string {
  if (n === 0) return "Hari ini";
  if (n === 1) return "Besok";
  if (n > 1) return `${n} hari lagi`;
  if (n === -1) return "Kemarin";
  return `${Math.abs(n)} hari lalu`;
}
