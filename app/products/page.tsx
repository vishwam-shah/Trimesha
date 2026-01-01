"use client";

import { Header } from "@/components/layout/header";
import { PageLoader } from "@/components/common/page-loader";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const products = [
  {
    id: "analytics-platform",
    title: "Analytics Platform",
    icon: "material-symbols:analytics",
    shortDesc: "Gain insights from your data",
    description: "Transform raw data into actionable insights with our comprehensive analytics platform. Track metrics, visualize trends, and make data-driven decisions with ease.",
    features: [
      { text: "Real-time Data Processing", icon: "line-md:speedometer-loop" },
      { text: "Custom Dashboards", icon: "line-md:grid-3-twotone" },
      { text: "Advanced Visualization", icon: "line-md:chart-twotone" },
      { text: "Data Export & Reports", icon: "line-md:document-report-twotone" },
      { text: "Team Collaboration", icon: "line-md:account-multiple" },
      { text: "API Integration", icon: "line-md:uploading-loop" },
    ],
    technologies: [
      { name: "React", icon: "logos:react" },
      { name: "Python", icon: "logos:python" },
      { name: "TensorFlow", icon: "logos:tensorflow" },
      { name: "PostgreSQL", icon: "logos:postgresql" }
    ],
    benefits: [
      { text: "Make data-driven decisions", icon: "line-md:confirm-circle-twotone" },
      { text: "Improve business efficiency", icon: "line-md:speedometer-loop" },
      { text: "Track KPIs in real-time", icon: "line-md:chart-twotone" },
      { text: "Reduce costs & optimize", icon: "line-md:arrow-down-circle" },
    ],
    glowColor: 'blue' as const,
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    icon: "material-symbols:psychology",
    shortDesc: "Intelligent automation powered by AI",
    description: "Leverage cutting-edge artificial intelligence to automate tasks, answer questions, and enhance productivity. Our AI Assistant learns from your workflow to provide personalized support.",
    features: [
      { text: "Natural Language Processing", icon: "line-md:chat-twotone" },
      { text: "Task Automation", icon: "line-md:cog-loop" },
      { text: "24/7 Availability", icon: "line-md:moon-filled-to-sunny-filled-loop-transition" },
      { text: "Multi-language Support", icon: "line-md:text-box-multiple-twotone" },
      { text: "Learning & Adaptation", icon: "line-md:lightbulb-twotone" },
      { text: "Seamless Integration", icon: "line-md:uploading-loop" },
    ],
    technologies: [
      { name: "OpenAI", icon: "simple-icons:openai" },
      { name: "Python", icon: "logos:python" },
      { name: "FastAPI", icon: "simple-icons:fastapi" },
      { name: "Redis", icon: "logos:redis" }
    ],
    benefits: [
      { text: "Increase productivity by 40%", icon: "line-md:arrow-up-circle-twotone" },
      { text: "Automate repetitive tasks", icon: "line-md:cog-loop" },
      { text: "Reduce response time", icon: "line-md:speedometer-loop" },
      { text: "Improve customer satisfaction", icon: "line-md:heart-twotone" },
    ],
    glowColor: 'purple' as const,
  },
  {
    id: "cloud-storage",
    title: "Cloud Storage",
    icon: "material-symbols:cloud",
    shortDesc: "Secure and scalable cloud storage",
    description: "Store, manage, and access your files from anywhere with our secure cloud storage solution. Enterprise-grade security with unlimited scalability.",
    features: [
      { text: "Unlimited Storage", icon: "line-md:cloud-up-twotone-loop" },
      { text: "End-to-End Encryption", icon: "line-md:shield-check" },
      { text: "File Versioning", icon: "line-md:document-list-twotone" },
      { text: "Cross-Platform Sync", icon: "line-md:uploading-loop" },
      { text: "Advanced Sharing", icon: "line-md:account-multiple" },
      { text: "Automatic Backup", icon: "line-md:cloud-download-loop" },
    ],
    technologies: [
      { name: "AWS S3", icon: "logos:aws-s3" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Kubernetes", icon: "logos:kubernetes" },
      { name: "MongoDB", icon: "logos:mongodb-icon" }
    ],
    benefits: [
      { text: "99.99% uptime guarantee", icon: "line-md:confirm-circle-twotone" },
      { text: "Military-grade encryption", icon: "line-md:shield-check" },
      { text: "Access from anywhere", icon: "line-md:map-marker-twotone" },
      { text: "Automatic scaling", icon: "line-md:arrow-up" },
    ],
    glowColor: 'green' as const,
  },
  {
    id: "api-services",
    title: "API Services",
    icon: "material-symbols:api",
    shortDesc: "Powerful APIs for seamless integration",
    description: "Connect your applications with our robust API services. RESTful and GraphQL APIs with comprehensive documentation and developer tools.",
    features: [
      { text: "RESTful API", icon: "line-md:uploading-loop" },
      { text: "GraphQL Support", icon: "line-md:document-code" },
      { text: "Webhook Integration", icon: "line-md:external-link" },
      { text: "Rate Limiting", icon: "line-md:speedometer-loop" },
      { text: "API Analytics", icon: "line-md:chart-twotone" },
      { text: "Developer Portal", icon: "line-md:account-small-twotone" },
    ],
    technologies: [
      { name: "Node.js", icon: "logos:nodejs-icon" },
      { name: "GraphQL", icon: "logos:graphql" },
      { name: "Docker", icon: "logos:docker-icon" },
      { name: "Nginx", icon: "logos:nginx" }
    ],
    benefits: [
      { text: "Easy integration", icon: "line-md:confirm-circle-twotone" },
      { text: "Comprehensive docs", icon: "line-md:document-list-twotone" },
      { text: "High performance", icon: "line-md:speedometer-loop" },
      { text: "Reliable & scalable", icon: "line-md:arrow-up-circle" },
    ],
    glowColor: 'orange' as const,
  },
];

export default function ProductsPage() {
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
              Our Products
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
              Powerful tools and platforms designed to accelerate your business growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section - Each wrapped in GlowCard */}
      <section className="relative w-full py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="space-y-24">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlowCard
                  glowColor={product.glowColor}
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
                          icon={product.icon}
                          className="w-12 h-12 text-violet-600 dark:text-violet-400"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                          {product.title}
                        </h2>
                        <p className="text-xl text-violet-600 dark:text-violet-400 mb-4">
                          {product.shortDesc}
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground/60 mb-3 uppercase tracking-wide flex items-center gap-2">
                          <Icon icon="line-md:cog-loop" className="w-4 h-4" />
                          Built With
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.technologies.map((tech) => (
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
                          Key Features
                        </h3>
                        <ul className="space-y-3">
                          {product.features.map((feature) => (
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
                          Why Choose This
                        </h3>
                        <ul className="space-y-3">
                          {product.benefits.map((benefit) => (
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
              Explore our products and see how they can transform your business operations.
            </p>
            <button className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Schedule a Demo
            </button>
          </motion.div>
        </div>
      </section>
    </PageLoader>
  );
}
