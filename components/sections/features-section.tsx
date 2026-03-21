"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { Card } from "@/components/ui/stacking-card";

const digitalServices = [
  {
    title: "Web Development",
    description: "We craft high-performance, SEO-optimized websites and web applications using cutting-edge technologies like Next.js, React, and TypeScript.",
    link: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    color: "#1e3a5f",
  },
  {
    title: "Mobile Applications",
    description: "Build powerful native iOS and Android applications with React Native and Flutter for seamless cross-platform experiences.",
    link: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&auto=format&fit=crop&q=80",
    color: "#3b1f6e",
  },
  {
    title: "Custom Software",
    description: "Enterprise-grade software solutions tailored to your unique business needs. CRM systems, ERP solutions, and workflow automation.",
    link: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    color: "#0d3b2e",
  },
  {
    title: "UI/UX Design",
    description: "Transform your vision into stunning, user-centered interfaces through research-driven wireframes, prototypes, and design systems.",
    link: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80",
    color: "#6b1540",
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploy and scale with confidence on AWS, Azure, or Google Cloud with CI/CD pipelines and 99.9% uptime guarantee.",
    link: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80",
    color: "#7a2c0a",
  },
  {
    title: "Cybersecurity",
    description: "Protect your digital assets with enterprise-grade security solutions, penetration testing, and 24/7 threat monitoring.",
    link: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&auto=format&fit=crop&q=80",
    color: "#003d4d",
  },
  {
    title: "API Development",
    description: "Build robust RESTful and GraphQL APIs with scalable microservices architecture and seamless third-party integrations.",
    link: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    color: "#5c1a1a",
  },
  {
    title: "Data Analytics",
    description: "Unlock the power of your data with AI-driven analytics, custom dashboards, and machine learning models.",
    link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    color: "#0a3d3d",
  },
];

export function FeaturesSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={container} className="relative w-full bg-background">
      {/* Header */}
      <div className="mx-auto max-w-5xl py-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What We Provide
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          End-to-end digital solutions to transform your business and accelerate growth
        </p>
      </div>

      {/* Stacking Cards */}
      <div className="w-full">
        {digitalServices.map((service, i) => {
          const n = digitalServices.length;
          const targetScale = 1 - (n - i) * 0.05;
          // Spread ranges evenly across [0, 1] so every card gets a fair share
          const rangeStart = i / n;
          return (
            <Card
              key={`service_${i}`}
              i={i}
              url={service.link}
              title={service.title}
              color={service.color}
              description={service.description}
              progress={scrollYProgress}
              range={[rangeStart, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
