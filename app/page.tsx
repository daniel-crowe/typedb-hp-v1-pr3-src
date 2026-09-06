import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Insight } from "@/components/Insight";
import { Jobs } from "@/components/Jobs";
import { Meaning } from "@/components/Meaning";
import { StackFit } from "@/components/StackFit";
import { StartPath } from "@/components/StartPath";
import { Suite } from "@/components/Suite";
import { TypeqlBlock } from "@/components/TypeqlBlock";
import { copy } from "@/lib/copy";

export default async function Home() {
  const typeql = <TypeqlBlock code={copy.s5.typeql} />;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StackFit />
        <Meaning />
        <Jobs />
        <Insight />
        <Suite typeql={typeql} />
        <StartPath />
        <Community />
      </main>
      <Footer />
    </>
  );
}
