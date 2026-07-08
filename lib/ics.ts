// Builds a downloadable .ics (iCalendar) event so an agenda item can be
// added straight to the visitor's phone calendar as a reminder/alarm.
import type { Agenda, Bidang } from "./types";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toIcsDate(d: Date): string {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

function toIcsDateTimeUtc(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function escapeIcsText(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function buildAgendaIcs(agenda: Agenda, bidang: Bidang, date: Date): string {
  const dtEnd = new Date(date);
  dtEnd.setDate(dtEnd.getDate() + 1);
  const description = [bidang.nama, agenda.tujuan].filter(Boolean).join(" — ");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PMII Rayon Fakultas Syariah//Agenda//ID",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${agenda.id}@pmii-rasya-web`,
    `DTSTAMP:${toIcsDateTimeUtc(new Date())}`,
    `DTSTART;VALUE=DATE:${toIcsDate(date)}`,
    `DTEND;VALUE=DATE:${toIcsDate(dtEnd)}`,
    `SUMMARY:${escapeIcsText(agenda.nama)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Pengingat agenda",
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** A `data:` URI suitable for an `<a href download>` that opens the phone's calendar app. */
export function buildAgendaIcsDataUri(agenda: Agenda, bidang: Bidang, date: Date): string {
  const ics = buildAgendaIcs(agenda, bidang, date);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
