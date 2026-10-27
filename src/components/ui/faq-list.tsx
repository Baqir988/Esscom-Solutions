import { Plus } from "lucide-react";
import type { FAQ } from "@/types/solution";
export function FAQList({ items }: { items: FAQ[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.question}>
          <summary>
            {item.question}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
