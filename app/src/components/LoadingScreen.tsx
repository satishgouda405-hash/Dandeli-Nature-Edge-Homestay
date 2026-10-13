import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(counter.val)),
    })
      .to('.loader-logo', {
        scale: 0.85,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      }, '-=0.15')
      .to('.loader-bg', {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      });

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="loader-bg fixed inset-0 z-[200] bg-forest-black flex flex-col items-center justify-center overflow-hidden">
      {/* Giant ghost word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display font-extrabold uppercase text-[18vw] text-stroke-white opacity-[0.07] whitespace-nowrap">
          Dandeli
        </span>
      </div>

      <div className="loader-logo flex flex-col items-center relative z-10">
        <img
          src="/images/logo.png"
          alt="Nature Edge"
          className="h-20 w-auto brightness-0 invert loader-pulse"
        />
        <div className="mt-5 font-display font-bold text-white text-2xl tracking-[0.2em] uppercase">
          {progress}%
        </div>
        <div className="mt-2 text-lime-wild/80 text-[11px] tracking-[0.35em] uppercase">
          Entering the wild
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[220px] h-[3px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-lime-wild to-terracotta transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
