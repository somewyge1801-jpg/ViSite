import Image from "next/image";
import { Button } from "@/components/ui/button";
import { concepts, hero, type ConceptId } from "@/lib/concepts";
import { withBasePath } from "@/lib/base-path";

function Navigation() {
  return <nav aria-label="Навигация первого экрана">
    <a href="#terms">Формат и цена</a>
    <a href="#booking">Запись</a>
    <a href={withBasePath("/concepts/")}>Все концепции</a>
  </nav>;
}

function BookingAction() {
  return <div className="action-block">
    <Button className="booking-cta" asChild><a href="#booking">{hero.action}</a></Button>
    <p className="terms" id="terms">{hero.terms}</p>
  </div>;
}

function Artwork({ id, sizes }: { id: ConceptId; sizes: string }) {
  return <figure className="art">
    <div className="image-frame"><Image src={withBasePath("/garden/" + id + ".webp")} alt={concepts[id].alt} fill preload sizes={sizes} /></div>
    <figcaption>{concepts[id].caption}</figcaption>
  </figure>;
}

function Landscape() {
  return <section id="hero" className="landscape" aria-labelledby="title">
    <Artwork id="a" sizes="100vw" />
    <div className="field-note">
      <h1 id="title">{hero.title}</h1>
      <p className="lead">{hero.lead}</p><p>{hero.intro}</p>
      <BookingAction />
    </div>
  </section>;
}

function Editorial() {
  return <section id="hero" className="editorial" aria-labelledby="title">
    <h1 id="title">{hero.title}</h1>
    <div className="spread">
      <p className="standfirst">{hero.lead}</p>
      <Artwork id="b" sizes="(max-width: 700px) 50vw, 31vw" />
      <div className="author-column">
        <p>{hero.intro}</p>
        <BookingAction />
      </div>
    </div>
  </section>;
}

function Botanical() {
  return <section id="hero" className="botanical" aria-labelledby="title">
    <h1 id="title">{hero.title}</h1>
    <div className="specimen">
      <p className="left-label">{hero.lead}</p>
      <Artwork id="c" sizes="(max-width: 700px) 76vw, 32vw" />
      <p className="right-label">{hero.intro}</p>
    </div>
    <BookingAction />
  </section>;
}

export function ConceptScreen({ id }: { id: ConceptId }) {
  return <div className={"prototype theme-" + id}>
    <a className="skip-link" href="#hero">К содержанию</a>
    <header className="topbar">
      <a href={withBasePath("/concepts/")} className="wordmark">Тёплый сад</a>
      <div className="top-nav"><Navigation /></div>
      <details className="mobile-menu"><summary>Меню</summary><Navigation /></details>
    </header>
    <main>
      {id === "a" && <Landscape />}
      {id === "b" && <Editorial />}
      {id === "c" && <Botanical />}
      <section className="booking-note" id="booking" tabIndex={-1}>
        <h2>Запись на консультацию</h2>
        <p>В готовом сайте кнопка откроет личный Telegram Виктории. Ссылка для записи пока ожидается.</p>
        <a href="#hero">Вернуться к первому экрану</a>
      </section>
    </main>
    <footer className="foot"><a href={withBasePath("/concepts/")}>Сравнить концепции</a><a href={withBasePath("/concepts/#choice-" + id)}>Выбрать вариант {id.toUpperCase()}</a></footer>
  </div>;
}
