import { connection } from "next/server";
import CreditCheckSection from "@/components/home/CreditCheckSection";
import FeaturedMotorcyclesCarousel from "@/components/home/FeaturedMotorcyclesCarousel";
import FinancingFaq from "@/components/home/FinancingFaq";
import HeroShowroom from "@/components/home/HeroShowroom";
import NewsSection from "@/components/home/NewsSection";
import PhotoSection from "@/components/home/PhotoSection";
import SalesHighlights from "@/components/home/SalesHighlights";
import { getNovedades, getProductos } from "@/data/catalog-store";

export default async function HomePage() {
  await connection();

  const [productos, novedades] = await Promise.all([getProductos(), getNovedades()]);

  return (
    <main className="flex-1 bg-slate-50 text-slate-950">
      <HeroShowroom />
      <SalesHighlights />
      <NewsSection novedades={novedades} />
      <CreditCheckSection />
      <FeaturedMotorcyclesCarousel productos={productos} />
      <FinancingFaq />
      <PhotoSection />
    </main>
  );
}
