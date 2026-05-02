import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/sections/HomeHero";
import { ComebackBanner } from "@/components/sections/ComebackBanner";
import { Countdown } from "@/components/sections/Countdown";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { HomeCTA } from "@/components/sections/HomeCTA";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HomeHero />
        <ComebackBanner />
        <Countdown />
        <Marquee />
        <About />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
