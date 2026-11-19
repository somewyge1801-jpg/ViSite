"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { bookingHref, sections } from "@/content/settings";

type SectionId = typeof sections[number][0];
const names = Object.fromEntries(sections);
const groups: { title: string; items: SectionId[] }[] = [
  { title: "Практика", items: ["about", "education", "approach"] },
  { title: "Консультации", items: ["services", "conditions", "faq"] },
  { title: "Библиотека", items: ["products", "materials", "documents"] },
];

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const bar = header.current!;
    const root = document.documentElement;
    const targets = sections.map(([id]) => document.getElementById(id)!);
    let frame = 0;
    function update() {
      frame = 0;
      const bottom = bar.getBoundingClientRect().bottom + 24;
      const current = targets.filter(section => section.getBoundingClientRect().top <= bottom).at(-1);
      const atEnd = window.scrollY + window.innerHeight >= root.scrollHeight - 2;
      const hash = location.hash.slice(1) as SectionId;
      const atEndTarget = atEnd && names[hash] && document.getElementById(hash)!.getBoundingClientRect().top >= 0;
      setActive(atEndTarget ? hash : atEnd ? "documents" : (current?.id as SectionId) || "home");
      setScrolled(window.scrollY > 4);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function measure() {
      root.style.setProperty("--garden-header-height", bar.offsetHeight + "px");
      schedule();
    }
    function closeGroups(keep?: Element | null) {
      bar.querySelectorAll<HTMLDetailsElement>(".nav-group[open]").forEach(group => {
        if (group !== keep) group.open = false;
      });
    }
    function outside(event: PointerEvent) {
      closeGroups((event.target as Element).closest(".nav-group"));
    }
    function focus(event: FocusEvent) {
      closeGroups((event.target as Element).closest(".nav-group"));
    }
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const group = bar.querySelector<HTMLDetailsElement>(".nav-group[open]");
      if (group) { group.open = false; group.querySelector("summary")?.focus(); }
    }
    const desktop = matchMedia("(min-width: 64em)");
    const onResize = () => { if (desktop.matches) dialog.current?.close(); closeGroups(); };
    desktop.addEventListener("change", onResize);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focus);
    document.addEventListener("keydown", escape);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("hashchange", schedule);
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    measure();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); root.style.removeProperty("--garden-header-height");
      desktop.removeEventListener("change", onResize);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("keydown", escape);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const sync = () => setOpen(el.open);
    el.addEventListener("close", sync);
    return () => el.removeEventListener("close", sync);
  }, []);

  function closeMenu() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }

  function follow(event: MouseEvent<HTMLAnchorElement>, id: SectionId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    dialog.current?.close();
    setOpen(false);
    const group = event.currentTarget.closest("details");
    if (group) group.open = false;
    document.getElementById(id)?.focus({ preventScroll: true });
    setActive(id);
  }
  function link(id: SectionId) {
    return <a key={id} href={"#" + id} aria-current={active === id ? "location" : undefined} onClick={event => follow(event,id)}>{names[id]}</a>;
  }
  return <header className="site-header" data-scrolled={scrolled} ref={header}>
    <a className="garden-skip" href="#home">К содержанию</a>
    <div className="header-inner">
      <a className="personal-logo" href="#home">Виктория Горбачева</a>
      <nav className="desktop-nav" aria-label="Основная навигация">
        {groups.map(group => <details key={group.title} className="nav-group" name="garden-navigation">
          <summary data-active={group.items.includes(active)}>{group.title}</summary>
          <div>{group.items.map(link)}</div>
        </details>)}
        {link("contacts")}
      </nav>
      <a href={bookingHref} className="header-book">Записаться</a>
      <button type="button" className="menu-trigger" ref={trigger} aria-label="Открыть меню" aria-haspopup="dialog" aria-controls="garden-menu" aria-expanded={open} onClick={() => {dialog.current?.showModal();setOpen(true);}}>
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
      </button>
      <noscript><style>{".practice .menu-trigger {display:none}"}</style><details className="fallback-menu"><summary>Меню</summary><nav aria-label="Разделы">{sections.map(([id,label])=><a key={id} href={"?section="+id+"#"+id}>{label}</a>)}</nav></details></noscript>
    </div>
    <dialog id="garden-menu" ref={dialog} aria-labelledby="menu-title" onClose={() => setOpen(false)} onClick={event=>{if(event.target === dialog.current) closeMenu();}} onCancel={event=>{event.preventDefault();closeMenu();}} onKeyDown={event=>{if(event.key === "Escape"){event.preventDefault();closeMenu();}}}>
      <div className="menu-sheet"><div className="menu-title"><h2 id="menu-title">Разделы сайта</h2><button type="button" autoFocus onClick={closeMenu}>Закрыть</button></div>
        <nav aria-label="Мобильная навигация">{sections.map(([id])=>link(id))}</nav>
      </div>
    </dialog>
  </header>;
}
