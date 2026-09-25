import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
export function Visit() {
  return (
    <section
      id="visit"
      className="visit-section shell"
      aria-labelledby="visit-title"
    >
      <div>
        <p className="eyebrow">See you at the Den</p>
        <h2 id="visit-title">
          The coffee&apos;s on.
          <br />
          <em>Come on over.</em>
        </h2>
        <div className="visit-details">
          <div>
            <MapPin />
            <p>
              <strong>Find us in Plantsville</strong>57 W Main St, Plantsville,
              CT 06479
            </p>
          </div>
          <div>
            <Clock />
            <p>
              <strong>Make it your daily stop</strong>Open daily, 6:00 AM – 7:00
              PM
            </p>
          </div>
          <div>
            <Phone />
            <p>
              <strong>Give us a ring</strong>
              <a href="tel:+18604262809">(860) 426-2809</a>
            </p>
          </div>
        </div>
        <a href="mailto:lionsdencoffeect@gmail.com" className="email-link">
          lionsdencoffeect@gmail.com
        </a>
        <div className="visit-actions">
          <a
            className="button"
            href="https://www.google.com/maps/dir/?api=1&destination=57+W+Main+St+Plantsville+CT+06479"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <ArrowUpRight size={17} />
          </a>
        </div>
        <p className="service-area">
          A short trip from Southington, Cheshire, Bristol, and Wolcott.
        </p>
      </div>
      <div className="map-wrap">
        <iframe
          title="Lions Den Coffee Shop location in Plantsville"
          src="https://maps.google.com/maps?q=57%20W%20Main%20St%20Plantsville%20CT%2006479&t=&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="map-label">
          <span>YOUR NEIGHBORHOOD COFFEE HOUSE</span>
          <MapPin size={18} />
        </div>
      </div>
    </section>
  );
}
