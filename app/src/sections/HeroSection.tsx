import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MapPin, Star, ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const marqueeItems = [
  'WHITE WATER RAFTING', 'JUNGLE SAFARI', 'KAYAKING', 'CAMPFIRE NIGHTS',
  'BIRD WATCHING', 'CORACLE RIDES', 'RIVERSIDE STAYS', 'ZIPLINING',
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      '.hero-line',
      { yPercent: 110, rotate: 3 },
      { yPercent: 0, rotate: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 }
    )
      .fromTo(
        '.hero-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
        '-=0.5'
      )
      .fromTo(
        '.hero-marquee',
        { yPercent: 100 },
        { yPercent: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

    // Parallax on scroll
    const st = gsap.to(bgRef.current, {
      yPercent: 22,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const fade = gsap.to(contentRef.current, {
      opacity: 0,
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '60% top',
        scrub: true,
      },
    });

    return () => { tl.kill(); st.kill(); fade.kill(); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowChevron(window.scrollY < 200);
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
      {/* Background with parallax + vivid grade */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
          <img
            src="/images/vid-hero-poster.jpg"
            alt="Kali River at sunrise with mist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,22,0.55)] via-[rgba(11,27,22,0.25)] to-[rgba(11,27,22,0.85)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,27,22,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-[1100px] mx-auto"
        style={{ marginTop: '-6vh' }}
      >
        <div className="hero-fade flex items-center justify-center gap-3 mb-6 opacity-0">
          <span className="h-px w-10 bg-lime-wild" />
          <span className="text-lime-wild text-[11px] md:text-xs font-medium tracking-[0.3em] uppercase flex items-center gap-2">
            <MapPin size={13} /> Riverside · Western Ghats · Karnataka
          </span>
          <span className="h-px w-10 bg-lime-wild" />
        </div>

        <h1 className="font-display font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white">
          <span className="block overflow-hidden">
            <span className="hero-line block text-[clamp(52px,11vw,140px)] will-change-transform">
              LOSE YOURSELF
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line block text-[clamp(52px,11vw,140px)] will-change-transform">
              IN THE <span className="grad-text">WILD</span>
            </span>
          </span>
        </h1>

        <div className="hero-fade font-accent text-[clamp(26px,4vw,46px)] text-lime-wild mt-5 opacity-0">
          Dandeli Nature Edge Homestay
        </div>

        <p className="hero-fade text-white/85 text-base md:text-lg font-normal leading-relaxed mt-6 max-w-[620px] mx-auto opacity-0">
          Escape to the heart of the Western Ghats — riverside serenity, thrilling
          jungle adventures and authentic Karnataka hospitality at one wild address.
        </p>

        <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="pill-button pill-button-primary group"
          >
            Book Your Stay
            <ArrowDownRight size={18} className="group-hover:rotate-[-45deg] transition-transform duration-300" />
          </a>
          <a
            href="#activities"
            onClick={(e) => handleNavClick(e, '#activities')}
            className="pill-button pill-button-secondary"
          >
            Explore Activities
          </a>
        </div>

        <div className="hero-fade flex items-center justify-center gap-2 mt-8 opacity-0">
          <Star size={15} className="fill-[#D6FF4B] text-lime-wild" />
          <Star size={15} className="fill-[#D6FF4B] text-lime-wild" />
          <Star size={15} className="fill-[#D6FF4B] text-lime-wild" />
          <Star size={15} className="fill-[#D6FF4B] text-lime-wild" />
          <Star size={15} className="fill-[#D6FF4B] text-lime-wild" />
          <span className="text-white/70 text-sm ml-2">4.8 · 81+ happy explorers</span>
        </div>
      </div>

      {/* Rotating badge */}
      <div className="hero-fade hidden md:block absolute bottom-28 right-[6vw] z-10 opacity-0">
        <div className="relative w-32 h-32 animate-float-soft">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slower">
            <defs>
              <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-lime-wild" style={{ fontSize: '8.2px', letterSpacing: '0.22em', fontFamily: 'Space Grotesk, sans-serif' }}>
              <textPath href="#circlePath">ADVENTURE AWAITS • BOOK NOW • </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowDownRight size={26} className="text-white" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${
          showChevron ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={26} className="text-lime-wild animate-bounce-gentle" />
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="hero-marquee absolute bottom-0 left-0 right-0 z-10 bg-lime-wild py-3 overflow-hidden -rotate-1 origin-left scale-[1.02] shadow-[0_-10px_40px_rgba(11,27,22,0.4)]">
        <div className="flex whitespace-nowrap animate-marquee will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="font-display font-bold uppercase text-forest-black text-sm md:text-base tracking-[0.08em] mx-6 flex items-center gap-6"
                >
                  {item}
                  <span className="text-terracotta text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
