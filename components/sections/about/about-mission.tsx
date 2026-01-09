"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Icon } from "@iconify/react";

export function AboutMission() {
    const missionCards = [
        {
            title: "Our Mission",
            description:
                "To empower businesses worldwide with innovative digital solutions that drive growth, enhance efficiency, and create lasting value. We believe in transforming challenges into opportunities through technology.",
            image: "/about/mission-vision.png",
            overlay: "bg-purple-600/10",
            icon: "mdi:bullseye-arrow",
        },
        {
            title: "Our Vision",
            description:
                "To become the global leader in digital transformation, recognized for our commitment to excellence, innovation, and sustainable technology solutions that shape the future of business.",
            image: "/about/innovation-tech.png",
            overlay: "bg-blue-600/10",
            icon: "mdi:eye",
        },
        {
            title: "Our Approach",
            description:
                "We combine cutting-edge technology with deep industry expertise and a client-centric mindset. Every project is tailored to your unique needs, ensuring maximum impact and ROI.",
            image: "/about/team-collaboration.png",
            overlay: "bg-violet-600/10",
            icon: "mdi:lightbulb-on",
        },
    ];

    return (
        <section id="mission" className="relative py-24 bg-background">
            {/* Background Pattern - Theme Aware */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern
                            id="mission-grid"
                            x="0"
                            y="0"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="30" cy="30" r="1.5" fill="rgb(139, 92, 246)" opacity="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mission-grid)" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                        What Drives Us Forward
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Built on a foundation of innovation, integrity, and unwavering commitment to excellence
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {missionCards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.7 }}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className={`absolute inset-0 ${card.overlay} z-10`} />
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                {/* Icon Badge */}
                                <div className="absolute top-4 right-4 z-20 bg-background border border-border rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                    <Icon icon={card.icon} className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {card.description}
                                </p>

                                {/* Decorative Element */}
                                <motion.div
                                    className="mt-6 h-1 bg-purple-600 dark:bg-purple-400 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "60%" }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
                                />
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-purple-500/5" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
