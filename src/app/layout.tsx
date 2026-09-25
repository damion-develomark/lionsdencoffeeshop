import type { Metadata } from "next";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

// Google Fonts: Playfair Display (display), Crimson Pro (body),
// Poppins (labels/UI), Pinyon Script (accent). Font tokens live in globals.css.
const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300..900;1,300..900&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lionsdencoffeeshop.com"),
  title: "Lions Den Coffee Shop | Italian Coffee in Plantsville, CT",
  description:
    "Come in and slow down. Italian-style coffee, breakfast, paninis, and good company at 57 W Main St in Plantsville, CT. Open daily, 6 AM to 7 PM.",
  openGraph: {
    title: "Lions Den Coffee Shop | Sip & Stay",
    description:
      "Italian coffee, honest food, and good company in Plantsville, CT.",
    images: [
      {
        url: "/images/patio.webp",
        width: 963,
        height: 575,
        alt: "The Lions Den patio",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={GOOGLE_FONTS_URL} />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Lions Den Coffee Shop",
              url: "https://www.lionsdencoffeeshop.com",
              image: "https://www.lionsdencoffeeshop.com/images/patio.webp",
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
              openingHours: "Mo-Su 06:00-19:00",
              sameAs: [
                "https://www.instagram.com/lionsden_coffee/",
                "https://www.facebook.com/lionsdencoffeeshopCT",
              ],
            }),
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
