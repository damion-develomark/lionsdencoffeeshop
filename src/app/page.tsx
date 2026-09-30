import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Culture } from "@/components/sections/Culture";
import { MenuBoard } from "@/components/sections/MenuBoard";
import { SlowDownBand } from "@/components/sections/SlowDownBand";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Reviews } from "@/components/sections/Reviews";
import { Visit } from "@/components/sections/Visit";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";

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
        <Reviews />
        <Visit />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
