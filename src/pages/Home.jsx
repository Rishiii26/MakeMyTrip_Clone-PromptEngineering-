import React from 'react';
import { ProductNav } from '../components/Navigation/ProductNav';
import { UniversalSearchWidget } from '../components/Search/UniversalSearchWidget';
import { ExploreMoreBar } from '../components/Home/ExploreMoreBar';
import { OffersSection } from '../components/Home/OffersSection';
import { HandpickedStays } from '../components/Home/HandpickedStays';
import { AppDownloadBanner } from '../components/Home/AppDownloadBanner';
import { WhyMMT } from '../components/Home/WhyMMT';
import { FAQSection } from '../components/Home/FAQSection';

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      
      {/* HERO SECTION */}
      <section className="bg-mmt-hero pt-8 pb-20 px-3 sm:px-6 relative overflow-visible">
        
        {/* Subtle decorative celestial sparkles / stars */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

        {/* Product Navigation Bar floating on Hero */}
        <ProductNav />

        {/* Universal Search Card floating below Product Nav */}
        <UniversalSearchWidget />

      </section>

      {/* QUICK LINKS / EXPLORE MORE */}
      <ExploreMoreBar />

      {/* OFFERS & BANK DISCOUNTS */}
      <OffersSection />

      {/* HANDPICKED LUXURY STAYS & DESTINATIONS */}
      <HandpickedStays />

      {/* MOBILE APP PROMO */}
      <AppDownloadBanner />

      {/* TRUST PILLARS */}
      <WhyMMT />

      {/* FAQ ACCORDION */}
      <FAQSection />

    </div>
  );
};
