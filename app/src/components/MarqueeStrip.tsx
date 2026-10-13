import { Sparkles } from 'lucide-react';

interface MarqueeStripProps {
  items: string[];
  variant?: 'lime' | 'dark' | 'terra';
  rotate?: number;
  slow?: boolean;
}

const variantStyles: Record<string, string> = {
  lime: 'bg-lime-wild text-forest-black',
  dark: 'bg-forest-black text-white',
  terra: 'bg-terracotta text-white',
};

export default function MarqueeStrip({ items, variant = 'lime', rotate = 0, slow = false }: MarqueeStripProps) {
  return (
    <div
      className={`relative overflow-hidden py-4 ${variantStyles[variant]} marquee-paused`}
      style={{ transform: `rotate(${rotate}deg) scale(1.03)` }}
    >
      <div className={`flex whitespace-nowrap will-change-transform ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {items.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-display font-bold uppercase text-lg md:text-xl tracking-[0.06em] mx-5 flex items-center gap-10"
              >
                {item}
                <Sparkles size={18} className="opacity-70 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
