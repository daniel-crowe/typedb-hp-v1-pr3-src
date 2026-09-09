import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AiSystems } from "@/components/AiSystems";
import { Analytics } from "@/components/Analytics";
import { Neo4jStrip } from "@/components/Neo4jStrip";
import { StartPath } from "@/components/StartPath";
import { Suite } from "@/components/Suite";

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AiSystems />
        <Analytics />
        <Neo4jStrip />
        <Suite />
        <StartPath />
      </main>
      <Footer />
    </>
  );
}
