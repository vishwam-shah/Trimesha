import { Header } from "@/components/layout/header";
import { PageLoader } from "@/components/common/page-loader";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutStats } from "@/components/sections/about/about-stats";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutTeam } from "@/components/sections/about/about-team";

export default function AboutPage() {
    return (
        <PageLoader>
            <Header />
            <AboutHero />
            <AboutStats />
            <AboutMission />
            <AboutValues />
            <AboutTeam />
        </PageLoader>
    );
}
