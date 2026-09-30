import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.137993374167!2d-72.89399312393019!3d41.58789737127507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e7b7a05ba38407%3A0xc5307551e86f97b7!2sLions%20Den%20Coffee%20Shop!5e0!3m2!1sen!2sus!4v1790760758228!5m2!1sen!2sus";

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
              <strong>Make it your daily stop</strong>
              Mon–Fri, 6:00 AM – 7:00 PM
              <br />
              Sat &amp; Sun, 7:00 AM – 7:00 PM
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
          className="visit-map"
          src={MAP_EMBED_URL}
          title="Google Map showing Lions Den Coffee Shop at 57 West Main Street, Plantsville, CT"
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
