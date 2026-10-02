import { FAQ } from "@/data/faq";

// Native <details> keeps every answer in the server HTML (crawlable while
// collapsed) and gives keyboard support with no client JS. A shared `name`
// makes it an exclusive accordion: opening one card closes the others.
export function FAQSection() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">Good to know</p>
          <h2 id="faq-title">Questions About Visiting Lions Den</h2>
          <span className="faq-rule" aria-hidden="true" />
          <p>
            Hours, ordering, the patio and more, for your next stop at our
            Plantsville, CT coffee shop.
          </p>
          <p className="faq-call">
            Still wondering? Call <a href="tel:+18604262809">860-426-2809</a>
          </p>
        </div>
        <div className="faq-list">
          {FAQ.map((item, index) => (
            <details
              key={item.id}
              name="faq"
              className="faq-item"
              open={index === 0}
            >
              <summary>
                <h3>{item.question}</h3>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
