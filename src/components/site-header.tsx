"use client";

import { useEffect, useRef, useState } from "react";
import { booking } from "@/lib/concepts";

const sections = [
  { href: "#terms", label: "Формат и цена" },
  { href: "#booking", label: "Запись" },
  { href: "/concepts/", label: "Все концепции" },
];

type HeaderState = "static" | "top" | "scrolled";

export function SiteHeader() {
  const [state, setState] = useState<HeaderState>("static");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isTelegram = Boolean(booking.telegramUrl);
  const bookingHref = booking.telegramUrl ?? "#booking";
  const externalLink = isTelegram ? { target: "_blank", rel: "noreferrer" } : {};

  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      setState(window.scrollY > 8 ? "scrolled" : "top");
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panel?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header" data-state={state}>
      <a className="site-brand" href="/concepts/" aria-label="Виктория Горбачева — все концепции сайта">
        <span className="brand-kicker" aria-hidden="true">Тёплый сад</span>
        <span className="brand-name">Виктория Горбачева</span>
      </a>

      <nav className="desktop-nav" aria-label="Основные разделы">
        <ul>
          {sections.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">
        <a className="header-cta" href={bookingHref} {...externalLink}>
          {booking.label}
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-icon" aria-hidden="true" />
        </button>
      </div>

      <div
        ref={panelRef}
        id="site-menu"
        className="mobile-panel"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <nav aria-label="Мобильное меню разделов">
          <ul>
            {sections.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="panel-cta" href={bookingHref} onClick={closeMenu} {...externalLink}>
          Записаться на консультацию
        </a>
      </div>
    </header>
  );
}
