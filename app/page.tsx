import { CloseCta } from "@/components/CloseCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Industries } from "@/components/Industries";
import { Insight } from "@/components/Insight";
import { Jobs } from "@/components/Jobs";
import { Meaning } from "@/components/Meaning";
import { Metrics } from "@/components/Metrics";
import { StackFit } from "@/components/StackFit";
import { StartPath } from "@/components/StartPath";
import { Suite } from "@/components/Suite";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StackFit />
        <Meaning />
        <Jobs />
        <Insight />
        <Suite />
        <StartPath />
        <Metrics />
        <Industries />
        <CloseCta />
      </main>
      <Footer />
    </>
  );
}
