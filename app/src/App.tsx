import { useState, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';
import LoadingScreen from '@/components/LoadingScreen';
import CursorGlow from '@/components/CursorGlow';
import MarqueeStrip from '@/components/MarqueeStrip';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import AccommodationsSection from '@/sections/AccommodationsSection';
import StatsSection from '@/sections/StatsSection';
import WebGLTransitionSection from '@/sections/WebGLTransitionSection';
import ActivitiesSection from '@/sections/ActivitiesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CursorGlow />
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <div className="relative z-20 -my-3">
          <MarqueeStrip
            rotate={-1.5}
            items={['Riverside Cottages', 'Jungle Safaris', 'Bonfire Nights', 'Kali River', 'Western Ghats']}
          />
        </div>
        <AccommodationsSection />
        <StatsSection />
        <WebGLTransitionSection />
        <ActivitiesSection />
        <TestimonialsSection />
        <div className="relative z-20 -my-3">
          <MarqueeStrip
            rotate={1.5}
            variant="terra"
            slow
            items={['Book Your Adventure', 'Dandeli Nature Edge', 'Stay Wild', 'Karnataka Hospitality']}
          />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
