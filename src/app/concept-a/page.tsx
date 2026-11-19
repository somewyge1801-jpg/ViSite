import { ConceptScreen } from "@/components/concept-screen";
import { concepts } from "@/lib/concepts";

export const metadata = { title: concepts.a.name + " · Тёплый сад" };

export default function Page() {
  return <ConceptScreen id="a" />;
}
