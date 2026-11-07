import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import LatestWork from "@/components/home/LatestWork";
import PlateShowcase from "@/components/home/PlateShowcase";
import FeaturedVideos from "@/components/home/FeaturedVideos";
import WorksMarquee from "@/components/home/WorksMarquee";
import ForkTheoryShowcase from "@/components/home/ForkTheoryShowcase";
import HomeEnquirySection from "@/components/home/HomeEnquirySection";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Executive Chef Anand Kumar | Luxury Hospitality & Culinary Leader",
  description: "Official website of Executive Chef Anand Kumar — International Culinary Leader, Luxury Hospitality Consultant, and Founder of ForkTheory.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedPortfolio />
      <LatestWork />
      <PlateShowcase />
      <FeaturedVideos />
      <WorksMarquee />
      <ForkTheoryShowcase />
      <HomeEnquirySection />
    </>
  );
}
