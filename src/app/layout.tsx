import type { Metadata } from "next";
import {
  Anton,
  Crimson_Pro,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const crimson = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
  preload: false,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lionsdencoffeeshop.com"),
  title: "Lions Den Coffee Shop® | Italian Coffee in Plantsville, CT",
  description:
    "Visit Lions Den Coffee Shop in Plantsville, CT for Italian-style coffee, breakfast and paninis. Explore our menu and find us at 57 W Main St.",
  openGraph: {
    url: "https://www.lionsdencoffeeshop.com/",
    siteName: "Lions Den Coffee Shop",
    title: "Lions Den Coffee Shop® | Sip & Stay",
    description:
      "Italian coffee, honest food, and good company in Plantsville, CT.",
    images: [
      {
        url: "/images/og-lions-den-storefront.jpg",
        width: 1200,
        height: 630,
        alt: "A cannoli and a coffee on the patio in front of the Lions Den Coffee Shop storefront",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${anton.variable} ${playfair.variable} ${crimson.variable} ${poppins.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              "@id": "https://www.lionsdencoffeeshop.com/#business",
              name: "Lions Den Coffee Shop",
              url: "https://www.lionsdencoffeeshop.com",
              image:
                "https://www.lionsdencoffeeshop.com/images/og-lions-den-storefront.jpg",
              telephone: "+1-860-426-2809",
              email: "lionsdencoffeect@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "57 W Main St",
                addressLocality: "Plantsville",
                addressRegion: "CT",
                postalCode: "06479",
                addressCountry: "US",
              },
              openingHours: ["Mo-Fr 06:00-19:00", "Sa-Su 07:00-19:00"],
              sameAs: [
                "https://www.instagram.com/lionsden_coffee/",
                "https://www.facebook.com/lionsdencoffeeshopCT",
                "https://www.youtube.com/channel/UC2ybOXg47gGzBELnd_4OwXw",
              ],
            }),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
