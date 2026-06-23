import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import Toast from '@/components/Toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (leftRef.current) {
      gsap.from(leftRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (rightRef.current) {
      gsap.from(rightRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.9,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastVisible(true);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} className="text-moss shrink-0" />,
      text: '6JXR+3W9, Dandeli, Kerawada, Karnataka 581325',
    },
    {
      icon: <Phone size={20} className="text-moss shrink-0" />,
      text: '+91 99026 84037',
    },
    {
      icon: <Mail size={20} className="text-moss shrink-0" />,
      text: 'hello@dandelinatureedge.com',
    },
    {
      icon: <Clock size={20} className="text-moss shrink-0" />,
      text: 'Check-in: 2:00 PM | Check-out: 11:00 AM',
    },
  ];

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="bg-cream py-[80px] lg:py-[140px]"
      >
        <div className="max-w-[1400px] mx-auto px-[6vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <div ref={leftRef}>
              <SectionLabel text="GET IN TOUCH" color="moss" />
              <h2 className="section-headline text-forest mt-3">
                BOOK YOUR ESCAPE
              </h2>

              <div className="mt-10 space-y-6">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    {item.icon}
                    <span className="text-warm-grey text-base">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Map Embed */}
              <div className="mt-9 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30778.06800459949!2d74.6234269!3d15.2476571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf21001dce2b27%3A0xcff7aad275b37584!2sDandeli%20Nature%20Edge%20Homestay!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Dandeli Nature Edge Location"
                />
              </div>
            </div>

            {/* Right Column - Form */}
            <div ref={rightRef}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Check-in Date"
                    required
                    className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                  <input
                    type="date"
                    placeholder="Check-out Date"
                    required
                    className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  />
                </div>
                <select
                  required
                  defaultValue=""
                  className="w-full h-14 rounded-xl border border-[rgba(138,133,120,0.3)] px-5 text-base bg-white form-input appearance-none cursor-pointer"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <option value="" disabled>
                    Number of Guests
                  </option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} Guest{i !== 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Special Requests or Message"
                  rows={4}
                  className="w-full rounded-xl border border-[rgba(138,133,120,0.3)] px-5 py-4 text-base bg-white resize-y form-input"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                />
                <button
                  type="submit"
                  className="w-full h-14 bg-forest text-white rounded-xl font-medium text-base hover:bg-terracotta transition-colors duration-300"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Toast
        message="Thank you! We'll get back to you within 24 hours."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}
