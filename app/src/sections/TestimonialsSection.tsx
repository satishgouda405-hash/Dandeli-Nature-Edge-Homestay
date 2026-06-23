import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featuredTestimonial = {
  quote:
    'Our stay at Nature Edge was nothing short of magical. The hosts treated us like family, the food was incredible, and waking up to misty river views was unforgettable. We\'ll definitely be back!',
  author: 'Priya & Rahul, Bangalore',
  stars: 5,
};

const reviews = [
  {
    quote: 'Amazing hospitality and beautiful location.',
    author: 'Amit K., Mumbai',
    stars: 5,
  },
  {
    quote: 'Best dosa we ever had! Lovely family atmosphere.',
    author: 'Sneha R., Pune',
    stars: 5,
  },
  {
    quote: 'Perfect base for exploring Dandeli. Clean and peaceful.',
    author: 'David M., UK',
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (featuredRef.current) {
      gsap.from(featuredRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.review-card');
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-forest py-[80px] lg:py-[140px]"
    >
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <SectionLabel text="GUEST STORIES" color="gold" />
          <h2 className="section-headline text-white mt-3">
            WORDS FROM THE WILD
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div ref={featuredRef} className="text-center max-w-[900px] mx-auto mb-16">
          <span className="text-gold text-6xl lg:text-7xl font-serif leading-none">&ldquo;</span>
          <p className="text-white text-xl lg:text-[28px] font-light italic leading-relaxed -mt-4">
            {featuredTestimonial.quote}
          </p>
          <p className="text-white/70 text-base mt-8">
            &mdash; {featuredTestimonial.author}
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: featuredTestimonial.stars }).map((_, i) => (
              <Star key={i} size={20} className="text-gold fill-gold" />
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="review-card bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <Star key={j} size={16} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-white/90 text-base italic leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>
              <p className="text-white/60 text-sm mt-4">
                &mdash; {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
