import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { MenuBoard } from "@/components/sections/MenuBoard";
import { SlowDownBand } from "@/components/sections/SlowDownBand";
import { Atmosphere } from "@/components/sections/Atmosphere";
import { Visit } from "@/components/sections/Visit";
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
        <MenuBoard />
        <SlowDownBand />
        <Atmosphere />
        <Visit />
      </main>
      <SiteFooter />
    </>
  );
}
