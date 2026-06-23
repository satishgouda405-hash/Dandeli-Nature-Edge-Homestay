import { useState } from 'react';
import { Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Stay', href: '#accommodations' },
  { label: 'Activities', href: '#activities' },
  { label: 'Experiences', href: '#activities' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest pt-16 lg:pt-20 pb-8">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Left Column - Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Nature Edge Logo"
                className="h-10 w-auto brightness-0 invert"
              />
              <div>
                <div className="text-white text-xl font-medium tracking-[0.1em]">
                  NATURE EDGE
                </div>
                <div className="text-white/60 text-sm">Dandeli Homestay</div>
              </div>
            </div>
            <p className="text-white/50 text-sm mt-4 max-w-[280px] leading-relaxed">
              Your gateway to the wild heart of Karnataka.
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <div className="text-white/50 text-xs font-medium uppercase tracking-[0.08em] mb-5">
              EXPLORE
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white text-sm hover:text-terracotta transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Social + Newsletter */}
          <div>
            <div className="text-white/50 text-xs font-medium uppercase tracking-[0.08em] mb-5">
              FOLLOW US
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white hover:text-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={22} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white hover:text-terracotta transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={22} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-white hover:text-terracotta transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={22} />
              </a>
              <a
                href="https://wa.me/919902684037"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-terracotta transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            <div className="mt-6">
              <p className="text-white/60 text-sm mb-3">
                Subscribe for seasonal offers
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 h-11 px-4 rounded-l-lg bg-white/10 text-white text-sm placeholder:text-white/40 border border-white/10 border-r-0 focus:outline-none focus:border-terracotta"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <button
                  type="submit"
                  className="w-11 h-11 bg-terracotta rounded-r-lg flex items-center justify-center hover:bg-[#B54D20] transition-colors"
                >
                  <ArrowRight size={18} className="text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            &copy; 2025 Dandeli Nature Edge Homestay. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/50 text-xs">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>&middot;</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
