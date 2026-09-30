import { DeferredEmbed } from "@/components/ui/deferred-embed";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

// Typeform live embed: embed.js finds the data-tf-live element and mounts
// the form in it. DeferredEmbed waits until the form approaches the viewport.
export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Contact us</p>
          <h2 id="contact-title">
            Contact Lions Den,
            <br />
            <em>say hello.</em>
          </h2>
          <p>
            Send us a note with the form and we&apos;ll get back to you. Prefer
            to reach us directly? We&apos;re here too:
          </p>
          <ul className="contact-alt">
            <li>
              <Mail aria-hidden />
              <a href="mailto:lionsdencoffeect@gmail.com">
                lionsdencoffeect@gmail.com
              </a>
            </li>
            <li>
              <Phone aria-hidden />
              <a href="tel:+18604262809">(860) 426-2809</a>
            </li>
          </ul>
          <div className="join-card">
            <h3>Join Lions Den</h3>
            <p>
              Sign up for news, specials, and offers from Lions Den Coffee
              Shop®.
            </p>
            <a
              className="button"
              href="https://www.toasttab.com/lions-den-coffee-shop/marketing-signup"
              target="_blank"
              rel="noreferrer"
            >
              Join Lions Den <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <DeferredEmbed
          className="contact-form"
          src="https://embed.typeform.com/next/embed.js"
        >
          <div data-tf-live="01M3RTE66NJ0R5QBMKYMNRY241" />
        </DeferredEmbed>
      </div>
    </section>
  );
}
