import { Header } from "@/components/layout/header";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutStats } from "@/components/sections/about/about-stats";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutTeam } from "@/components/sections/about/about-team";

export default function AboutPage() {
    return (
        <>
            <Header />
            <AboutHero />
            <AboutStats />
            <AboutMission />
            <AboutValues />
            <AboutTeam />
        </>
    );
}
