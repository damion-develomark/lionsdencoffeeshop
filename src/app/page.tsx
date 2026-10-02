import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Culture } from "@/components/sections/Culture";
import { MenuBoard } from "@/components/sections/MenuBoard";
import { SlowDownBand } from "@/components/sections/SlowDownBand";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Reviews } from "@/components/sections/Reviews";
import { FAQSection } from "@/components/sections/FAQSection";
import { Visit } from "@/components/sections/Visit";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.lionsdencoffeeshop.com/" },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Culture />
        <MenuBoard />
        <SlowDownBand />
        <Atmosphere />
        <ComingSoon />
        <Reviews />
        <FAQSection />
        <Visit />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
