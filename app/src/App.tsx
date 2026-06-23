import { useState, useCallback } from 'react';
import { useLenis } from '@/hooks/useLenis';
import LoadingScreen from '@/components/LoadingScreen';
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
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <AccommodationsSection />
        <StatsSection />
        <WebGLTransitionSection />
        <ActivitiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
