import Link from "next/link";
import { offeringFaqs, type Athlete } from "@/data/athletes";
import { PlusIcon } from "@/components/home/Faq";

export function OfferingFaq({ a }: { a: Athlete }) {
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="faq">
          <div className="section-head">
            <h2 className="h2">Questions before you invest</h2>
            <p className="lead">
              Short answers. The Form C has the full terms.{" "}
              <Link href="/#faqs">More questions</Link>
            </p>
          </div>
          <div>
            {offeringFaqs(a).map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <PlusIcon />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
