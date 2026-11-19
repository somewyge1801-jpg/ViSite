import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteOrigin } from "@/lib/origin";

import "./globals.css";
import "./fonts.css";
import "./concepts.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: "Виктория Горбачева — психолог в Саратове и онлайн | Тёплый сад",
  description: "Индивидуальные консультации психолога Виктории Горбачевой для взрослых и подростков от 16 лет. Онлайн и очно в Саратове.",
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
  openGraph: siteOrigin ? { type: "website", locale: "ru_RU", images: ["/garden/a.webp"] } : undefined,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
