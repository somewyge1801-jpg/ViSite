import Image from "next/image";
import { Button } from "@/components/ui/button";
import { concepts, hero, type ConceptId } from "@/lib/concepts";

function Navigation({ id }: { id: ConceptId }) {
  return <nav aria-label="Навигация концепции">
    <a href="#hero">Первый экран</a>
    <a href="#terms">Формат и цена</a>
    <a href="#booking">Запись</a>
    <a href="/">Все концепции</a>
    <a href={"/#choice-" + id}>Выбрать этот вариант</a>
  </nav>;
}

export function ConceptScreen({ id }: { id: ConceptId }) {
  const concept = concepts[id];
  return <div className={"prototype theme-" + id}>
    <a className="skip-link" href="#hero">К содержанию</a>
    <aside className="rail">
      <a href="/" className="wordmark">Тёплый сад</a>
      <div className="rail-nav"><Navigation id={id} /></div>
      <details className="mobile-menu"><summary>Меню</summary><Navigation id={id} /></details>
      <span className="rail-credit">Практика Виктории Горбачевой</span>
    </aside>
    <main className="canvas">
      <header className="folio"><span>Виктория Горбачева</span><span>Психолог</span></header>
      <section id="hero" className="hero-layout" aria-labelledby="hero-title">
        <h1 id="hero-title">{hero.title}</h1>
        <figure className="scene">
          <div className="scene-image">
            {id === "c" ? (
              <picture>
                <source media="(max-width: 760px)" srcSet="/garden/c-wide.webp" />
                <img src="/garden/c.webp" alt={concept.alt} width="1250" height="1250" fetchPriority="high" />
              </picture>
            ) : (
              <Image src={"/garden/" + id + ".webp"} alt={concept.alt} fill preload sizes="(max-width: 760px) 100vw, 52vw" />
            )}
          </div>
          <figcaption>{concept.caption}</figcaption>
        </figure>
        <div className="hero-copy">
          <p className="lead">{hero.lead}</p><p>{hero.intro}</p>
          <Button className="booking-cta" asChild><a href="#booking">{hero.action}</a></Button>
          <p id="terms" className="terms">{hero.terms}</p>
        </div>
      </section>
      <section className="booking-note" id="booking" tabIndex={-1}>
        <h2>Запись на консультацию</h2>
        <p>В готовом сайте кнопка откроет личный Telegram Виктории. Ссылка для записи пока ожидается.</p>
        <a href="#hero">Вернуться к первому экрану</a>
      </section>
      <footer className="foot"><a href="/">Сравнить концепции</a><a href={"/#choice-" + id}>Выбрать вариант {id.toUpperCase()}</a></footer>
    </main>
  </div>;
}
