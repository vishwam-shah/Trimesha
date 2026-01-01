"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { Card } from "@/components/ui/stacking-card";

const digitalServices = [
  {
    title: "Web Development",
    description: "We craft high-performance, SEO-optimized websites and web applications using cutting-edge technologies like Next.js, React, and TypeScript.",
    link: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
    color: "#5196fd",
  },
  {
    title: "Mobile Applications",
    description: "Build powerful native iOS and Android applications with React Native and Flutter for seamless cross-platform experiences.",
    link: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    color: "#8f89ff",
  },
  {
    title: "Custom Software",
    description: "Enterprise-grade software solutions tailored to your unique business needs. CRM systems, ERP solutions, and workflow automation.",
    link: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    color: "#13006c",
  },
  {
    title: "UI/UX Design",
    description: "Transform your vision into stunning, user-centered interfaces through research-driven wireframes, prototypes, and design systems.",
    link: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop",
    color: "#ed649e",
  },
  {
    title: "Cloud Infrastructure",
    description: "Deploy and scale with confidence on AWS, Azure, or Google Cloud with CI/CD pipelines and 99.9% uptime guarantee.",
    link: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    color: "#fd521a",
  },
  {
    title: "Cybersecurity",
    description: "Protect your digital assets with enterprise-grade security solutions, penetration testing, and 24/7 threat monitoring.",
    link: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    color: "#00a8cc",
  },
  {
    title: "API Development",
    description: "Build robust RESTful and GraphQL APIs with scalable microservices architecture and seamless third-party integrations.",
    link: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop",
    color: "#ff6b6b",
  },
  {
    title: "Data Analytics",
    description: "Unlock the power of your data with AI-driven analytics, custom dashboards, and machine learning models.",
    link: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    color: "#4ecdc4",
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
          const targetScale = 1 - (digitalServices.length - i) * 0.05;
          return (
            <Card
              key={`service_${i}`}
              i={i}
              url={service.link}
              title={service.title}
              color={service.color}
              description={service.description}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}

export default FeaturesSection;
