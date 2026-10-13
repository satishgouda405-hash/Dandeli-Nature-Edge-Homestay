import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Stay', href: '#accommodations' },
  { label: 'Activities', href: '#activities' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92vw] max-w-[1200px]">
        <div
          className={`flex items-center justify-between rounded-full px-5 md:px-7 h-16 transition-all duration-500 ${
            scrolled
              ? 'bg-[rgba(11,27,22,0.72)] backdrop-blur-2xl shadow-[0_12px_40px_rgba(11,27,22,0.35)] border border-white/10'
              : 'bg-[rgba(11,27,22,0.25)] backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/images/logo.png"
              alt="Nature Edge Logo"
              className="h-9 w-auto brightness-0 invert group-hover:rotate-[15deg] transition-transform duration-500"
            />
            <span className="text-white text-[15px] font-semibold tracking-[0.14em] uppercase font-display">
              Nature Edge
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link link-underline ${
                  activeSection === link.href.replace('#', '')
                    ? 'active text-lime-wild'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="pill-button h-11 px-6 text-[13px] bg-lime-wild text-forest-black font-bold hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Book Now
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[90] bg-forest-black flex flex-col justify-center px-[8vw] transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display font-extrabold uppercase text-white text-[clamp(36px,9vw,64px)] leading-[1.05] hover:text-lime-wild transition-colors duration-300"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-10 text-white/50 text-sm tracking-[0.2em] uppercase">
          Dandeli · Karnataka · India
        </div>
      </div>
    </>
  );
}
