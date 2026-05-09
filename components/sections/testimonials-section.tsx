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

const teamSpotlight = [
  {
    imageUrl: "/testimonial/mayank.jpeg",
    location: "Mayank Gautam",
    flag: IndianFlag,
    stats: "Intern",
    desc: "Full Stack Developer",
    href: "#team",
    themeColor: "180 50% 35%",
  },
  {
    imageUrl: "/testimonial/mehek.jpeg",
    location: "Mehek",
    flag: IndianFlag,
    stats: "Intern",
    desc: "Social Media Manager",
    href: "#team",
    themeColor: "330 60% 45%",
  },
];

export function TestimonialsSection() {
  return (
    <>
      <section className="w-full py-20 bg-background">
        <div className="mx-auto max-w-5xl mb-12 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Team spotlight
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            A few of the people building and telling the Trimesha story.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4">
          {teamSpotlight.map((member) => (
            <div key={member.location} className="w-full max-w-[320px] h-112.5">
              <ProfileCard {...member} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default TestimonialsSection;
