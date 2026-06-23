import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionLabel from '@/components/SectionLabel';

const activities = [
  { name: 'White Water Rafting', image: '/images/img-activity-rafting.jpg' },
  { name: 'Jungle Safari', image: '/images/img-activity-safari.jpg' },
  { name: 'Kayaking', image: '/images/img-activity-kayak.jpg' },
  { name: 'Bird Watching', image: '/images/img-activity-bird.jpg' },
  { name: 'Campfire Nights', image: '/images/img-activity-campfire.jpg' },
  { name: 'Coracle Ride', image: '/images/img-activity-coracle.jpg' },
];

export default function ActivitiesSection() {
  const gridRef = useScrollReveal<HTMLDivElement>({
    direction: 'up',
    distance: 40,
    duration: 0.7,
    stagger: 0.1,
    start: 'top 75%',
    childSelector: '.activity-card',
  });

  return (
    <section id="activities" className="bg-cream py-[80px] lg:py-[140px]">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <SectionLabel text="ADVENTURE AWAITS" color="moss" />
          <h2 className="section-headline text-forest mt-3">
            THINGS TO DO
          </h2>
          <p className="text-warm-grey text-base leading-relaxed mt-5 max-w-[560px]">
            From adrenaline-pumping water sports to serene nature walks, Dandeli
            offers experiences for every kind of traveler.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <div
              key={activity.name}
              className="activity-card relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="w-full h-[260px] lg:h-[320px] object-cover img-hover-scale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-white text-lg lg:text-xl font-medium">
                  {activity.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
