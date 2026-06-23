import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to(line1Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.1')
      .to(line2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.65')
      .to(decorativeRef.current, { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(subtitleRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(ctaRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2');

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowChevron(window.scrollY < 200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/vid-hero-poster.jpg"
          alt="Kali River at sunrise with mist"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(45,74,62,0.45)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto" style={{ marginTop: '-5vh' }}>
        <span
          ref={labelRef}
          className="block text-gold text-xs font-medium tracking-[0.15em] uppercase mb-5 opacity-0"
        >
          WELCOME TO
        </span>

        <div
          ref={line1Ref}
          className="text-white text-[clamp(40px,8vw,72px)] font-medium uppercase tracking-[-0.03em] leading-[0.95] opacity-0 translate-y-[60px]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          DANDELI NATURE
        </div>
        <div
          ref={line2Ref}
          className="text-white text-[clamp(40px,8vw,72px)] font-medium uppercase tracking-[-0.03em] leading-[0.95] mt-1 opacity-0 translate-y-[60px]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          EDGE HOMESTAY
        </div>

        <div
          ref={decorativeRef}
          className="font-accent text-[clamp(28px,4vw,48px)] text-moss mt-4 opacity-0"
        >
          where the wild meets tranquility
        </div>

        <p
          ref={subtitleRef}
          className="text-white/85 text-base md:text-lg font-normal leading-relaxed mt-7 max-w-[640px] mx-auto opacity-0"
        >
          Escape to the heart of the Western Ghats. Experience riverside serenity,
          thrilling jungle adventures, and authentic Karnataka hospitality at our
          eco-friendly retreat.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="pill-button pill-button-primary"
          >
            Book Your Stay
          </a>
          <a
            href="#activities"
            onClick={(e) => handleNavClick(e, '#activities')}
            className="pill-button pill-button-secondary"
          >
            Explore Activities
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${
          showChevron ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ChevronDown size={28} className="text-white/70 animate-bounce-gentle" />
      </div>
    </section>
  );
}
