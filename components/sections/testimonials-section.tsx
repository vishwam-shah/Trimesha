"use client";

import { ProfileCard } from "@/components/ui/profile-card";

const IndianFlag = (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="20" rx="2" fill="#fff"/>
    <rect y="0" width="28" height="6.67" fill="#FF9933"/>
    <rect y="13.33" width="28" height="6.67" fill="#138808"/>
    <circle cx="14" cy="10" r="2.2" stroke="#000088" strokeWidth="0.8" fill="#fff"/>
    <circle cx="14" cy="10" r="1.2" fill="#000088"/>
  </svg>
);

const coFounders = [
  {
    imageUrl: "/testimonial/Siddhant_01.JPG",
    location: "Siddhant Mehta",
    flag: IndianFlag,
    stats: "Co-Founder",
    desc: "Lead Software Engineer",
    href: "#",
    themeColor: "150 50% 25%",
  },
  {
    imageUrl: "/testimonial/vishwam_01.jpeg",
    location: "Vishwam Shah",
    flag: IndianFlag,
    stats: "Co-Founder",
    desc: "AI Developer",
    href: "#",
    themeColor: "250 50% 30%",
  },
  {
    imageUrl: "/testimonial/Jay_01.jpg",
    location: "Jay Trivedi",
    flag: IndianFlag,
    stats: "Co-Founder",
    desc: "AI Researcher",
    href: "#",
    themeColor: "30 70% 40%",
  },
];

export function TestimonialsSection() {
  return (
    <>
      {/* Co-Founders Section */}
      <section className="w-full py-20 bg-background">
        <div className="mx-auto max-w-5xl mb-12 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Co-Founders
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
          {coFounders.map((founder) => (
            <div key={founder.location} className="w-full max-w-[320px] h-112.5">
              <ProfileCard {...founder} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default TestimonialsSection;
