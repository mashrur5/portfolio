import type { Metadata } from "next";
import Header from "@/components/header";
import Leadership from "@/components/leadership";
import FloatingSocials from "@/components/floating-socials";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Leadership — ${siteContent.name}`,
  description: "Leadership roles and community involvement.",
};

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#05070f]">
      <Header />
      <Leadership />
      <FloatingSocials />
    </div>
  );
}
