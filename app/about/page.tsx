import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/about/Hero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { WhatWeBuild } from "@/components/about/WhatWeBuild";
import { Stats } from "@/components/about/Stats";
import { MissionVision } from "@/components/about/MissionVision";
import { Team } from "@/components/about/Team";
import { WhyUs } from "@/components/about/WhyUs";
import { getPublicTeamMembers } from "@/lib/team-public";

export const metadata: Metadata = {
  title: "About Us | Trimesha Digital Solutions",
  description:
    "Trimesha Digital Solutions builds custom AI systems, mobile apps, and web applications for startups and growing businesses. Founded 2025.",
  keywords: [
    "custom AI solutions",
    "machine learning development",
    "mobile app development",
    "web application development",
    "AI automation",
  ],
  openGraph: {
    title: "About Trimesha Digital Solutions",
    description:
      "We build custom AI systems for the way your business actually works.",
    url: "https://yourdomain.com/about",
    type: "website",
  },
};

export default async function AboutPage() {
  const teamMembers = await getPublicTeamMembers();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhoWeAre />
        <WhatWeBuild />
        <Stats />
        <MissionVision />
        <Team members={teamMembers} />
        <WhyUs />
      </main>
    </>
  );
}
