"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@iconify/react";

export function AboutTeam() {
    const [activeSlide, setActiveSlide] = useState(0);

    const teamHighlights = [
        {
            title: "Expert Team",
            stat: "15+",
            label: "Years Average Experience",
            description: "Our team comprises seasoned professionals with expertise across diverse domains",
            icon: "mdi:account-star",
        },
        {
            title: "Global Reach",
            stat: "40+",
            label: "Countries Served",
            description: "Delivering world-class solutions to clients across continents",
            icon: "mdi:earth",
        },
        {
            title: "Technology Stack",
            stat: "50+",
            label: "Technologies Mastered",
            description: "From cloud infrastructure to AI/ML, we master the latest tech",
            icon: "mdi:code-tags",
        },
    ];

    const expertise = [
        { name: "Full-Stack Development", level: 95 },
        { name: "Cloud Architecture", level: 90 },
        { name: "UI/UX Design", level: 92 },
        { name: "DevOps & CI/CD", level: 88 },
        { name: "Mobile Development", level: 85 },
        { name: "AI & Machine Learning", level: 87 },
    ];

    return (
        <section id="team" className="relative py-24 bg-background overflow-hidden">
            {/* Animated Grid Background - Theme Aware */}
            <div className="absolute inset-0 opacity-15 dark:opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
                        Meet Our Dream Team
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A diverse collective of passionate innovators, designers, and engineers
                    </p>
                </motion.div>

                {/* Carousel Section */}
                <div className="mb-16">
                    <div className="relative bg-card border border-border rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {teamHighlights.map((highlight, index) => (
                                <motion.button
                                    key={index}
                                    className={`p-8 text-left transition-all duration-500 ${activeSlide === index
                                            ? "bg-purple-600/10 dark:bg-purple-600/5"
                                            : "hover:bg-muted/50"
                                        }`}
                                    onClick={() => setActiveSlide(index)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="relative">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Icon icon={highlight.icon} className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                            <h3 className="text-xl font-bold text-foreground">
                                                {highlight.title}
                                            </h3>
                                        </div>
                                        <div className="text-5xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                                            {highlight.stat}
                                        </div>
                                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3">
                                            {highlight.label}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            {highlight.description}
                                        </p>

                                        {/* Active Indicator */}
                                        {activeSlide === index && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600 dark:bg-purple-400"
                                                layoutId="activeIndicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {teamHighlights.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index
                                        ? "bg-purple-600 dark:bg-purple-400 w-8"
                                        : "bg-border hover:bg-muted-foreground w-2"
                                    }`}
                                aria-label={`Slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Expertise Bars */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-card border border-border rounded-2xl p-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-foreground">
                            Our Expertise
                        </h3>
                        <div className="space-y-6">
                            {expertise.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-foreground">
                                            {skill.name}
                                        </span>
                                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-purple-600 dark:bg-purple-400 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 1, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Why Choose Us */}
                    <motion.div
                        className="bg-purple-600 rounded-2xl p-8 text-white"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Why Choose TRIMESHA?</h3>
                        <ul className="space-y-4">
                            {[
                                "24/7 dedicated support team",
                                "Agile development methodology",
                                "100% transparent communication",
                                "Scalable and future-proof solutions",
                                "Competitive pricing with no hidden costs",
                                "Post-launch maintenance & updates",
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Icon
                                        icon="mdi:check-circle"
                                        className="w-6 h-6 flex-shrink-0 mt-0.5"
                                    />
                                    <span className="text-white/90">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Call to Action */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-3xl font-bold mb-4 text-foreground">
                        Ready to Build Something Amazing?
                    </h3>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Let's turn your vision into reality. Our team is ready to discuss your project.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="/contact"
                            className="group relative px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:bg-purple-700"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Today
                                <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                            </span>
                        </a>
                        <a
                            href="/services"
                            className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-semibold rounded-xl hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white dark:hover:border-purple-600 transition-all"
                        >
                            View Our Services
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
