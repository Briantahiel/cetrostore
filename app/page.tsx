import FeaturedMotorcyclesCarousel from "@/components/home/FeaturedMotorcyclesCarousel";
import HeroShowroom from "@/components/home/HeroShowroom";
import PhotoSection from "@/components/home/PhotoSection";
import SalesHighlights from "@/components/home/SalesHighlights";

export default function HomePage() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-950">
      <HeroShowroom />
      <SalesHighlights />
      <FeaturedMotorcyclesCarousel />
      <PhotoSection />
    </main>
  );
}
