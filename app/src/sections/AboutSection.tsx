import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import { Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  'Riverside location with direct Kali River access',
  '6+ adventure activities including rafting & safari',
  'Authentic Malnad cuisine prepared fresh daily',
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    // Image parallax
    gsap.to(image.querySelector('img'), {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Image entrance
    gsap.from(image, {
      x: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    // Text elements stagger
    const textEls = text.querySelectorAll('.animate-in');
    gsap.from(textEls, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-cream py-[80px] lg:py-[140px]"
    >
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-0 items-center">
          {/* Image */}
          <div ref={imageRef} className="overflow-hidden rounded-2xl">
            <img
              src="/images/img-about.jpg"
              alt="Dandeli Nature Edge Homestay exterior"
              className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl"
            />
          </div>

          {/* Text Content */}
          <div ref={textRef} className="lg:pl-20">
            <SectionLabel text="ABOUT US" color="moss" className="animate-in" />
            <h2 className="section-headline text-forest mt-5 animate-in">
              A HOME IN THE WILD
            </h2>
            <p className="text-warm-grey text-base leading-relaxed mt-6 max-w-[480px] animate-in">
              Nestled on the banks of the Kali River, Dandeli Nature Edge Homestay
              offers a perfect blend of adventure and relaxation. Wake up to
              birdsong, spend your days exploring dense forests, and unwind by a
              crackling campfire under starlit skies. Our family-run homestay
              welcomes you with warm Karnataka hospitality and home-cooked local
              cuisine.
            </p>

            <div className="mt-9 space-y-4 animate-in">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Leaf size={20} className="text-moss mt-0.5 shrink-0" />
                  <span className="text-forest text-base">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block text-terracotta font-medium mt-9 hover:underline underline-offset-4 animate-in"
            >
              Read Our Story &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
