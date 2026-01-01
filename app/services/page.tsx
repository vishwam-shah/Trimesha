"use client";

import { Header } from "@/components/layout/header";
import { PageLoader } from "@/components/common/page-loader";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const services = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "line-md:document-code",
    shortDesc: "Build powerful, scalable web applications",
    description: "We craft high-performance, SEO-optimized websites and web applications using cutting-edge technologies. Our development approach ensures your digital presence is fast, secure, and scalable.",
    features: [
      { text: "Custom Website Development", icon: "line-md:laptop-twotone" },
      { text: "E-commerce Solutions", icon: "line-md:shopping-basket" },
      { text: "Progressive Web Apps (PWA)", icon: "line-md:phone-call-twotone-loop" },
      { text: "Content Management Systems", icon: "line-md:edit-twotone" },
      { text: "API Integration & Development", icon: "line-md:uploading-loop" },
      { text: "Performance Optimization", icon: "line-md:speedometer-loop" },
    ],
    technologies: [
      { name: "Next.js", icon: "logos:nextjs-icon" },
      { name: "React", icon: "logos:react" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" }
    ],
    benefits: [
      { text: "Lightning-fast page loads", icon: "line-md:speedometer-loop" },
      { text: "Mobile-first responsive design", icon: "line-md:phone-twotone" },
      { text: "SEO-optimized architecture", icon: "line-md:search-twotone" },
      { text: "Scalable cloud infrastructure", icon: "line-md:cloud-up-twotone-loop" },
    ],
    glowColor: 'blue' as const,
  },
  {
    id: "interface-design",
    title: "Interface Design",
    icon: "material-symbols:design-services",
    shortDesc: "Create stunning user experiences",
    description: "Transform your vision into stunning, user-centered interfaces through research-driven design. We create intuitive experiences that delight users and drive engagement.",
    features: [
      { text: "UI/UX Design", icon: "line-md:paint-drop-twotone" },
      { text: "Wireframing & Prototyping", icon: "line-md:clipboard-list-twotone" },
      { text: "Design Systems", icon: "line-md:grid-3-twotone" },
      { text: "Brand Identity Design", icon: "line-md:star-twotone-loop" },
      { text: "Responsive Web Design", icon: "line-md:laptop-twotone" },
      { text: "User Research & Testing", icon: "line-md:account-search-twotone" },
    ],
    technologies: [
      { name: "Figma", icon: "logos:figma" },
      { name: "Adobe XD", icon: "logos:adobe-xd" },
      { name: "Sketch", icon: "logos:sketch" },
      { name: "InVision", icon: "logos:invision" },
      { name: "Framer", icon: "logos:framer" }
    ],
    benefits: [
      { text: "User-centered design approach", icon: "line-md:account-small-twotone" },
      { text: "Consistent brand experience", icon: "line-md:confirm-circle-twotone" },
      { text: "Higher user engagement", icon: "line-md:heart-twotone" },
      { text: "Reduced development costs", icon: "line-md:arrow-small-down" },
    ],
    glowColor: 'purple' as const,
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    icon: "line-md:speedometer-loop",
    shortDesc: "Dominate search engine rankings",
    description: "Boost your online visibility and drive organic traffic with our comprehensive SEO strategies. We help your business rank higher and reach more customers.",
    features: [
      { text: "Keyword Research & Analysis", icon: "line-md:search-twotone" },
      { text: "On-Page SEO Optimization", icon: "line-md:document-twotone" },
      { text: "Technical SEO Audits", icon: "line-md:cog-loop" },
      { text: "Link Building Strategies", icon: "line-md:external-link" },
      { text: "Local SEO Services", icon: "line-md:map-marker-twotone" },
      { text: "SEO Analytics & Reporting", icon: "line-md:chart-twotone" },
    ],
    technologies: [
      { name: "Google Analytics", icon: "logos:google-analytics" },
      { name: "SEMrush", icon: "simple-icons:semrush" },
      { name: "Ahrefs", icon: "simple-icons:ahrefs" },
      { name: "Moz", icon: "simple-icons:moz" },
      { name: "Search Console", icon: "logos:google-icon" }
    ],
    benefits: [
      { text: "Increased organic traffic", icon: "line-md:arrow-up-circle-twotone" },
      { text: "Higher search rankings", icon: "line-md:star-filled" },
      { text: "Better conversion rates", icon: "line-md:confirm-circle-twotone" },
      { text: "Long-term ROI", icon: "line-md:arrow-up" },
    ],
    glowColor: 'green' as const,
  },
  {
    id: "branding",
    title: "Branding",
    icon: "material-symbols:palette",
    shortDesc: "Build a memorable brand identity",
    description: "Create a powerful brand identity that resonates with your audience. From logo design to complete brand guidelines, we help you stand out in the market.",
    features: [
      { text: "Logo Design & Brand Identity", icon: "line-md:star-pulsating-filled-loop" },
      { text: "Brand Strategy & Positioning", icon: "line-md:compass-loop" },
      { text: "Visual Identity Systems", icon: "line-md:paint-drop-half-twotone-loop" },
      { text: "Brand Guidelines", icon: "line-md:clipboard-list" },
      { text: "Marketing Collateral", icon: "line-md:document-list-twotone" },
      { text: "Brand Messaging", icon: "line-md:chat-twotone" },
    ],
    technologies: [
      { name: "Adobe Illustrator", icon: "skill-icons:illustrator" },
      { name: "Photoshop", icon: "skill-icons:photoshop" },
      { name: "InDesign", icon: "devicon:indesign" },
      { name: "After Effects", icon: "skill-icons:aftereffects" }
    ],
    benefits: [
      { text: "Strong brand recognition", icon: "line-md:star-filled" },
      { text: "Consistent visual identity", icon: "line-md:confirm-square-twotone" },
      { text: "Increased customer trust", icon: "line-md:heart-filled" },
      { text: "Competitive differentiation", icon: "line-md:arrow-up-circle" },
    ],
    glowColor: 'orange' as const,
  },
];

export default function ServicesPage() {
  return (
    <PageLoader>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 bg-background">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive digital solutions to elevate your business and drive growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Each wrapped in GlowCard */}
      <section className="relative w-full py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard
                  glowColor={service.glowColor}
                  customSize={true}
                  className="w-full h-auto"
                >
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } gap-12 items-center p-6 lg:p-8`}
                  >
                    {/* Icon & Title Side */}
                    <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20">
                        <Icon
                          icon={service.icon}
                          className="w-12 h-12 text-violet-600 dark:text-violet-400"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-xl text-violet-600 dark:text-violet-400 mb-4">
                          {service.shortDesc}
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/60 mb-3 uppercase tracking-wide flex items-center gap-2">
                          <Icon icon="line-md:cog-loop" className="w-4 h-4" />
                          Technologies We Use
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech.name}
                              className="px-3 py-1.5 rounded-full text-sm bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center gap-2"
                            >
                              <Icon icon={tech.icon} className="w-4 h-4" />
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Features & Benefits Side */}
                    <div className="flex-1 space-y-8">
                      {/* Features */}
                      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-violet-200/30 dark:border-violet-700/30">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                          <Icon icon="line-md:check-list-3-twotone" className="w-6 h-6 text-violet-600" />
                          What We Offer
                        </h3>
                        <ul className="space-y-3">
                          {service.features.map((feature) => (
                            <li key={feature.text} className="flex items-start gap-3">
                              <Icon
                                icon={feature.icon}
                                className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0"
                              />
                              <span className="text-muted-foreground">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl p-8 border border-violet-500/20">
                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                          <Icon icon="line-md:star-pulsating-twotone-loop" className="w-6 h-6 text-violet-600" />
                          Key Benefits
                        </h3>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit) => (
                            <li key={benefit.text} className="flex items-start gap-3">
                              <Icon
                                icon={benefit.icon}
                                className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5 shrink-0"
                              />
                              <span className="text-muted-foreground">{benefit.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 bg-background">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help transform your business and achieve your goals.
            </p>
            <button className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Book a Free Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </PageLoader>
  );
}
