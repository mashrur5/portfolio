import type { Metadata } from "next";
import Header from "@/components/header";
import Projects from "@/components/projects";
import FloatingSocials from "@/components/floating-socials";
import { siteContent } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Projects — ${siteContent.name}`,
  description: "Selected projects and case studies.",
};

export default function ProjectsPage() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_auto] bg-[#05070f] sm:h-screen sm:grid-rows-[auto_minmax(0,1fr)]">
      <Header />
      <Projects />
      <FloatingSocials />
    </div>
  );
}
