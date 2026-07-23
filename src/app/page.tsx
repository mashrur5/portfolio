import Header from "@/components/header";
import Hero from "@/components/hero";
import Education from "@/components/education";
import Featured from "@/components/featured";
import FloatingSocials from "@/components/floating-socials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070f]">
      <Header />
      <Hero />
      <Education />
      <Featured />
      <FloatingSocials />
    </main>
  );
}
