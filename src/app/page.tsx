import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
      <h1 className="font-serif text-5xl leading-tight sm:text-7xl">Тёплый сад</h1>
      <p className="mt-5 max-w-prose text-lg text-muted-foreground">
        Прототип сайта психолога.
      </p>
      <Button asChild className="mt-8">
        <a href="#about">О проекте</a>
      </Button>
      <section id="about" className="mt-16 scroll-mt-8 border-t border-border pt-8">
        <h2 className="font-serif text-3xl">О проекте</h2>
        <p className="mt-3 max-w-prose text-muted-foreground">
          Здесь появится информация о психологе, консультациях и записи на встречу.
        </p>
      </section>
    </main>
  );
}
