import type { NextRequest } from "next/server";

import { EVENT } from "@/lib/tokens";

const ESC = (s: string) => s.replace(/[\\;,]/g, (m) => "\\" + m).replace(/\n/g, "\\n");

const dtUtc = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

export function GET(_req: NextRequest) {
  const start = new Date(EVENT.startISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const stamp = new Date();

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Prom EFREI//La Nuit de l'EFREI//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:la-nuit-de-l-efrei-2026@promefrei.fr",
    `DTSTAMP:${dtUtc(stamp)}`,
    `DTSTART:${dtUtc(start)}`,
    `DTEND:${dtUtc(end)}`,
    `SUMMARY:${ESC("La Nuit de l'EFREI · MMXXVI")}`,
    `DESCRIPTION:${ESC(
      "Le retour, dix ans plus tard. Soirée privatisée par Prom EFREI. Portes 22h00, fin 04h00. Dress code : robe élégante ou costume. 1 cocktail/champagne + 1 soft offerts. Plus d'infos : https://la-nuit-de-l-efrei.vercel.app",
    )}`,
    `LOCATION:${ESC(`${EVENT.venue}, ${EVENT.address}, 75005 Paris`)}`,
    "GEO:48.8505;2.3528",
    "STATUS:CONFIRMED",
    "URL:https://la-nuit-de-l-efrei.vercel.app",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:La Nuit de l'EFREI · ce soir",
    "TRIGGER:-PT24H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  return new Response(lines, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="la-nuit-de-l-efrei.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
