import Image from "next/image";
import { GardenCover } from "@/components/garden-cover";
import type { ReactNode } from "react";
import copy from "@/content/practice.json";
import { settings, bookingHref } from "@/content/settings";
import "./practice.css";
import "./navigation.css";
import { SiteHeader } from "@/components/site-header";

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} tabIndex={-1} className="chapter"><h2>{title}</h2><div className="chapter-body">{children}</div></section>;
}
function Paragraphs({ lines }: { lines: string[] }) {
  return lines.map(line => <p key={line}>{line}</p>);
}
function Booking() { return <a className="garden-action" href={bookingHref}>{copy.hero.cta}</a>; }

export default function Home() {
  return <div className="practice">
    <SiteHeader />
    <main id="content">
      <section id="home" tabIndex={-1} className="garden-hero">
        <Image src={settings.garden} fill preload sizes="100vw" alt="Солнечная дорожка уходит в глубину цветущего сада" />
        <div className="garden-letter"><p className="signature">Тёплый сад</p><h1>{copy.hero.title}</h1>
          <p>{copy.hero.lead}</p><p>{copy.hero.intro}</p><Booking/><p className="price-line">{copy.hero.terms}</p>
        </div>
      </section>
      <div className="chapters">
        <Section id="about" title="Обо мне"><div className="bio">
          <figure><Image src={settings.portrait || settings.botanical} alt={settings.portrait ? "Виктория Горбачева" : "Ботанический этюд с цветком анемоны"} width={420} height={600}/><figcaption>{settings.portrait ? "Виктория Горбачева" : "Ботанический этюд на месте будущего портрета"}</figcaption></figure>
          <div><Paragraphs lines={copy.about}/></div></div></Section>
        <Section id="education" title="Образование"><Paragraphs lines={copy.educationIntro}/><ol className="education-list">{copy.education.map(item=><li key={item}>{item}</li>)}</ol>
          <h3>{copy.supervision.title}</h3><Paragraphs lines={copy.supervision.body}/>
          {settings.diplomas.length ? settings.diplomas.map(d=><a href={d.url} key={d.url}>{d.title}</a>) : <p className="quiet">Сканы дипломов готовятся к размещению.</p>}</Section>
        <Section id="approach" title="Запросы и подход"><h3>С чем ко мне можно обратиться</h3><ul className="requests">{copy.requests.map(line=><li key={line}>{line}</li>)}</ul><p>{copy.educationIntro[2]}</p></Section>
        <Section id="services" title="Услуги и цены"><div className="service-sheet"><h3>{copy.service.title}</h3><Paragraphs lines={copy.service.body}/><Booking/></div><h3>{copy.sessions.title}</h3><Paragraphs lines={copy.sessions.body}/></Section>
        <Section id="conditions" title="Условия и принципы">{copy.conditions.map(item=><details key={item.title}><summary>{item.title}</summary><Paragraphs lines={item.body}/></details>)}<h3>Принципы работы</h3>{copy.principles.map(item=><details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</Section>
        <Section id="products" title="Цифровые продукты"><div className="product-pair">{settings.products.map(product=>{
          const available = product.checkout.startsWith("https://") && settings.deliveryVerified && product.cover && product.contents && product.format && settings.documents.length && settings.supportEmail;
          return <article key={product.id} className={"product product-"+product.id}>
            <GardenCover>{product.cover ? <img src={product.cover} alt={"Обложка — "+product.title}/> : <div className="cover-study"><span>{product.title}</span><small>Эскиз обложки</small></div>}</GardenCover>
            <h3>{product.title}</h3><p>{product.description} {product.price} ₽.</p>
            <p>{product.contents || "Описание состава готовится."} {product.format}</p>
            <p>После подтверждения оплаты файл отправляется на указанную электронную почту.</p>
            {available ? <a className="garden-action" href={product.checkout}>Купить за {product.price} ₽</a> : <button disabled>Продажи ещё не открыты</button>}
          </article>;
        })}</div></Section>
        <Section id="materials" title="Материалы">{settings.materials.length ? settings.materials.map(item=><article key={item.url}><h3>{item.title}</h3><p>{item.description}</p><a href={item.url} download={item.download || undefined}>{item.download ? "Скачать бесплатно" : "Читать"}</a></article>) : <p>Здесь появятся публикации и бесплатные материалы для скачивания без регистрации.</p>}</Section>
        <Section id="faq" title="Вопросы и ответы">{copy.faq.map(item=><details key={item.title}><summary>{item.title}</summary><p>{item.body}</p></details>)}</Section>
        <Section id="contacts" title="Контакты"><h3>Очные консультации</h3><p>{settings.address}</p><h3>Запись в Telegram</h3>{settings.telegram ? <Booking/> : <p>Онлайн-запись пока недоступна. Здесь появится ссылка на личный Telegram Виктории.</p>}
          {settings.publicChannel && <p><a href={settings.publicChannel}>Telegram-канал</a></p>}
          {settings.instagram && <p><a href={settings.instagram}>Instagram</a></p>}
          {settings.vk && <p><a href={settings.vk}>VK</a></p>}
          {settings.supportEmail && <p><a href={"mailto:"+settings.supportEmail}>{settings.supportEmail}</a></p>}
        </Section>
        <Section id="documents" title="Документы">{settings.documents.length ? settings.documents.map(d=><p key={d.url}><a href={d.url}>{d.title}</a></p>) : <p>Условия оказания услуг, условия покупки и документы об обработке данных готовятся к размещению.</p>}</Section>
      </div>
    </main>
    <footer className="garden-footer"><span>Виктория Горбачева · Тёплый сад</span><a href="#home">К началу</a><a href="#documents">Документы</a></footer>
  </div>;
}
