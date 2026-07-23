import Header from "@/components/header";
import Hero from "@/components/hero";
import Featured from "@/components/featured";
import FloatingSocials from "@/components/floating-socials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070f]">
      <Header />
      <Hero />
      <Featured />
      <FloatingSocials />
    </main>
  );
}
