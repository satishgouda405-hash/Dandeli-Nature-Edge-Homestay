import { useEffect, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 1.5,
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.to('.loader-logo', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }).to('.loader-bg', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className="loader-bg fixed inset-0 z-[200] bg-forest flex flex-col items-center justify-center"
    >
      <div className="loader-logo flex flex-col items-center">
        <img
          src="/images/logo.png"
          alt="Nature Edge"
          className="h-24 w-auto brightness-0 invert loader-pulse"
        />
        <div className="mt-6 text-white/60 text-xs tracking-[0.15em] uppercase">
          Loading Experience
        </div>
      </div>
    </div>
  );
}
