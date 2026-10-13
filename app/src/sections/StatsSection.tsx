import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4.8, suffix: '', label: 'Google Rating', isDecimal: true },
  { value: 81, suffix: '+', label: 'Happy Guests', isDecimal: false },
  { value: 6, suffix: '+', label: 'Wild Activities', isDecimal: false },
  { value: 3, suffix: '', label: 'Room Types', isDecimal: false },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const animatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        if (animatedRef.current) return;
        animatedRef.current = true;

        stats.forEach((stat, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[i] = stat.isDecimal
                  ? Math.round(obj.val * 10) / 10
                  : Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-forest-black py-20 lg:py-28 relative overflow-hidden">
      {/* Giant ghost number backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-extrabold uppercase text-[22vw] text-stroke-white opacity-[0.05] whitespace-nowrap leading-none">
          4.8
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-[6vw] relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center group ${
                i > 0 ? 'lg:border-l lg:border-white/10' : ''
              }`}
            >
              <div className="font-display font-extrabold text-lime-wild text-6xl lg:text-7xl tracking-[-0.02em] animate-glow-pulse group-hover:scale-110 transition-transform duration-500">
                {counts[i]}{stat.suffix}
              </div>
              <div className="text-white/50 text-[12px] font-medium uppercase tracking-[0.25em] mt-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
