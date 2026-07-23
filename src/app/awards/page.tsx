import type { Metadata } from "next";
import Header from "@/components/header";
import Awards from "@/components/awards";
import FloatingSocials from "@/components/floating-socials";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Awards — ${siteContent.name}`,
  description: "Scholarships, competitions, and recognitions.",
};

export default function AwardsPage() {
  return (
    <div className="grid h-screen grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-[#05070f]">
      <Header />
      <Awards />
      <FloatingSocials />
    </div>
  );
}
