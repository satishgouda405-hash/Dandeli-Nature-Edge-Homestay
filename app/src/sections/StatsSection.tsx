import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 4.8, suffix: '', label: 'GOOGLE RATING', isDecimal: true },
  { value: 81, suffix: '+', label: 'HAPPY GUESTS', isDecimal: false },
  { value: 6, suffix: '+', label: 'ACTIVITIES', isDecimal: false },
  { value: 3, suffix: '', label: 'ROOM TYPES', isDecimal: false },
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
            duration: 1.5,
            ease: 'power2.out',
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
    <section
      ref={sectionRef}
      className="bg-cream py-[60px] lg:py-[100px] relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D4A3E' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-forest text-5xl lg:text-6xl font-medium tracking-[-0.02em]">
                {counts[i]}{stat.suffix}
              </div>
              <div className="text-warm-grey text-sm font-medium uppercase tracking-[0.05em] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
