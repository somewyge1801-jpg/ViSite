import Image from "next/image";
import { concepts, conceptIds } from "@/lib/concepts";

export default function Comparison() {
  return <main className="gallery">
    <header className="gallery-mast"><span className="wordmark">Тёплый сад</span><span>Виктория Горбачева · психолог</span></header>
    <div className="gallery-title"><h1>Три взгляда на сад</h1><p>Откройте первый экран в каждом варианте и выберите направление для сайта.</p></div>
    <div className="plates">
      {conceptIds.map((id) => <article className={"plate plate-" + id} key={id}>
        <a className="plate-link" href={"/concept-" + id + "/"}>
          <div className="plate-art"><Image src={"/garden/" + id + ".webp"} alt="" fill sizes="(max-width: 740px) 100vw, 33vw" /></div>
          <h2><span>{id.toUpperCase()}</span>{concepts[id].name}</h2>
        </a>
        <p>{concepts[id].note}</p>
        <div className="plate-actions"><a href={"/concept-" + id + "/"} aria-label={"Открыть " + concepts[id].name}>Открыть экран</a><a href={"#choice-" + id} aria-label={"Выбрать " + concepts[id].name}>Выбрать</a></div>
      </article>)}
    </div>
    <p className="gallery-caption">Изображения временные. В редакционном варианте ботанический этюд обозначает место для портрета Виктории.</p>
    {conceptIds.map(id => <section key={id} id={"choice-" + id} tabIndex={-1} className="choice-result">
      <h2>Вы выбрали «{concepts[id].name}»</h2>
      <p>Сохраните адрес этой страницы, чтобы вернуться к выбору.</p>
      <a href={"/concept-" + id + "/"}>Посмотреть выбранный экран</a> <a href="/">Сбросить выбор</a>
    </section>)}
  </main>;
}
