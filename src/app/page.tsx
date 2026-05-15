import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { HomeHero } from "@/components/sections/HomeHero";
import { ComebackBanner } from "@/components/sections/ComebackBanner";
import { Countdown } from "@/components/sections/Countdown";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { LatestNews } from "@/components/sections/LatestNews";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HomeHero />
        <ComebackBanner />
        <Countdown />
        <LatestNews />
        <Marquee />
        <About />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
