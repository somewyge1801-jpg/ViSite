/** Only public, customer-approved URLs belong here. Rebuild after editing. */
export const settings = {
  telegram: "", publicChannel: "", vk: "", instagram: "", supportEmail: "",
  portrait: "", diplomas: [] as { title: string; url: string }[],
  garden: "/garden/a.webp", botanical: "/garden/b.webp",
  address: "Саратов, ул. Советская, 60",
  materials: [] as { title: string; description: string; url: string; download: boolean }[],
  documents: [] as { title: string; url: string }[],
  deliveryVerified: false,
  products: [
    { id: "tracker", title: "Трекер-блокнот", price: 700, cover: "", description: "Цифровой продукт.", contents: "", format: "", checkout: "" },
    { id: "cards", title: "Карты", price: 1000, cover: "", description: "Цифровой продукт.", contents: "", format: "", checkout: "" },
  ],
};
export const bookingHref = settings.telegram || "/#contacts";
export const sections = [
  ["home","Главная"],["about","Обо мне"],["education","Образование"],["approach","Запросы и подход"],
  ["services","Услуги и цены"],["conditions","Условия и принципы"],["products","Продукты"],
  ["materials","Материалы"],["faq","Вопросы"],["contacts","Контакты"],["documents","Документы"],
] as const;
