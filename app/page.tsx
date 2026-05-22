import CreditCheckSection from "@/components/home/CreditCheckSection";
import FeaturedMotorcyclesCarousel from "@/components/home/FeaturedMotorcyclesCarousel";
import FinancingFaq from "@/components/home/FinancingFaq";
import HeroShowroom from "@/components/home/HeroShowroom";
import PhotoSection from "@/components/home/PhotoSection";
import SalesHighlights from "@/components/home/SalesHighlights";

export default function HomePage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-950">
      <HeroShowroom />
      <SalesHighlights />
      <CreditCheckSection />
      <FeaturedMotorcyclesCarousel />
      <FinancingFaq />
      <PhotoSection />
    </main>
  );
}
