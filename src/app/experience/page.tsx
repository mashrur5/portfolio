import type { Metadata } from "next";
import Header from "@/components/header";
import Experience from "@/components/experience";
import FloatingSocials from "@/components/floating-socials";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Experience — ${siteContent.name}`,
  description: "Where I've worked and studied, mapped.",
};

export default function ExperiencePage() {
  return (
    <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)] bg-[#05070f]">
      <Header />
      <Experience />
      <FloatingSocials />
    </div>
  );
}
