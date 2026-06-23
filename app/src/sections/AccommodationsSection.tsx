import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionLabel from '@/components/SectionLabel';

const rooms = [
  {
    name: 'Riverside Cottage',
    description:
      'A cozy cottage with panoramic river views, private sit-out, and modern amenities. Perfect for couples seeking tranquility.',
    price: '₹2,200',
    image: '/images/img-room-cottage.jpg',
  },
  {
    name: 'Forest View Room',
    description:
      'Spacious room overlooking the dense canopy. Wake up to misty forest views and the sounds of nature.',
    price: '₹1,800',
    image: '/images/img-room-forest.jpg',
  },
  {
    name: 'Family Suite',
    description:
      'Two-bedroom suite ideal for families or groups. Features a common living area and private balcony.',
    price: '₹3,500',
    image: '/images/img-room-family.jpg',
  },
];

export default function AccommodationsSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    direction: 'up',
    distance: 60,
    duration: 0.9,
    stagger: 0.15,
    start: 'top 80%',
    childSelector: '.room-card',
  });

  return (
    <section id="accommodations" className="bg-forest py-[80px] lg:py-[140px]">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <SectionLabel text="WHERE YOU'LL STAY" color="gold" />
          <h2 className="section-headline text-white mt-3">
            COMFORT IN NATURE
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rooms.map((room) => (
            <div key={room.name} className="room-card card-hover">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-[220px] lg:h-[280px] object-cover img-hover-scale"
                />
              </div>
              <h3 className="text-white text-xl lg:text-2xl font-medium mt-5">
                {room.name}
              </h3>
              <p className="text-white/70 text-base mt-3 leading-relaxed">
                {room.description}
              </p>
              <p className="text-gold text-lg lg:text-xl font-medium mt-4">
                {room.price} <span className="text-white/50 text-sm">/ night</span>
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block text-terracotta text-sm font-medium mt-3 hover:underline underline-offset-4"
              >
                View Details &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
