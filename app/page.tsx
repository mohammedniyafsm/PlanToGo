import HomeHero from "@/components/ui/home/Hero";
import StatementPanel from "@/components/ui/travel/StatementPanel";
import UpcomingTrips from "@/components/ui/travel/UpcomingTrips";
import HowItWorks from "@/components/ui/travel/HowItWorks";
import CompanyValues from "@/components/ui/travel/CompanyValues";
import ReverseTransition from "@/components/ui/travel/ReverseTransition";
import SocialProof from "@/components/ui/travel/SocialProof";
import FooterCTA from "@/components/ui/travel/FooterCTA";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#083CFE] overflow-x-hidden">
      {/* Hero Section (Original canvas intro - untouched) */}
      <HomeHero />

      {/* Statement Panel with Canvas Reverse Scrub (blue -> white) before Upcoming Group Journeys */}
      <StatementPanel />

      {/* PlanToGo Values Cards */}
      <CompanyValues />

      {/* Full screen canvas transition from blue to white */}
      <ReverseTransition />

      {/* Upcoming Group Journeys (Light #F7F9FC section) */}
      <UpcomingTrips />

      {/* How It Works */}
      <HowItWorks />



      {/* Social Proof */}
      <SocialProof />

      {/* Footer CTA */}
      <FooterCTA />
    </main>
  );
}
