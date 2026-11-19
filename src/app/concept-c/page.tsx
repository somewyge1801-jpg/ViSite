import { ConceptScreen } from "@/components/concept-screen";
import { concepts } from "@/lib/concepts";

export const metadata = { title: concepts.c.name + " · Тёплый сад", description: concepts.c.note, robots: { index: false } };

export default function Page() {
  return <ConceptScreen id="c" />;
}
