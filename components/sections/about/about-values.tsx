"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

export function AboutValues() {
    const values = [
        {
            title: "Innovation First",
            description: "We embrace cutting-edge technologies and creative solutions to stay ahead of the curve.",
            icon: "mdi:lightning-bolt",
            pattern: "dots",
        },
        {
            title: "Client Success",
            description: "Your success is our success. We're committed to delivering measurable results and ROI.",
            icon: "mdi:target-variant",
            pattern: "grid",
        },
        {
            title: "Quality Excellence",
            description: "We maintain the highest standards in every line of code, every design, and every interaction.",
            icon: "mdi:diamond-stone",
            pattern: "diagonal",
        },
        {
            title: "Transparency",
            description: "Open communication and honest collaboration form the foundation of our partnerships.",
            icon: "mdi:magnify",
            pattern: "circles",
        },
        {
            title: "Agile Mindset",
            description: "Flexible, adaptive, and responsive to change—delivering value in iterative cycles.",
            icon: "mdi:rocket",
            pattern: "squares",
        },
        {
            title: "Continuous Learning",
            description: "We invest in our team's growth to bring you the most advanced solutions available.",
            icon: "mdi:book-open-page-variant",
            pattern: "waves",
        },
    ];

    const getPatternSVG = (pattern: string, isDark: boolean) => {
        const color = isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.15)";

        switch (pattern) {
            case "dots":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`dots-pattern-${pattern}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill={color} />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#dots-pattern-${pattern})`} />
                    </svg>
                );
            case "grid":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`grid-pattern-${pattern}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#grid-pattern-${pattern})`} />
                    </svg>
                );
            case "diagonal":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`diagonal-pattern-${pattern}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 0 40 L 40 0" stroke={color} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#diagonal-pattern-${pattern})`} />
                    </svg>
                );
            case "circles":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`circles-pattern-${pattern}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#circles-pattern-${pattern})`} />
                    </svg>
                );
            case "squares":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`squares-pattern-${pattern}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                            <rect x="10" y="10" width="10" height="10" fill="none" stroke={color} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#squares-pattern-${pattern})`} />
                    </svg>
                );
            case "waves":
                return (
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id={`waves-pattern-${pattern}`} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 0 10 Q 10 0, 20 10 T 40 10" fill="none" stroke={color} strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#waves-pattern-${pattern})`} />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <section id="values" className="relative py-24 bg-muted/30">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-48 -left-48 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-48 -right-48 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
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
                        Our Core Values
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The principles that guide every decision we make and every solution we deliver
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-card border border-border rounded-2xl p-8 overflow-hidden hover:shadow-xl transition-all duration-500"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Pattern Background - Both light and dark */}
                            <div className="dark:hidden">
                                {getPatternSVG(value.pattern, false)}
                            </div>
                            <div className="hidden dark:block">
                                {getPatternSVG(value.pattern, true)}
                            </div>

                            {/* Gradient Overlay on Hover */}
                            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <motion.div
                                    className="text-5xl mb-4 inline-block"
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Icon icon={value.icon} className="text-purple-600 dark:text-purple-400" />
                                </motion.div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground leading-relaxed">
                                    {value.description}
                                </p>

                                {/* Decorative Corner */}
                                <motion.div
                                    className="absolute top-0 right-0 w-16 h-16"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <svg viewBox="0 0 100 100" className="text-purple-600/10 dark:text-purple-400/10">
                                        <path d="M 100 0 L 100 100 L 0 0 Z" fill="currentColor" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Bottom accent line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-purple-600 dark:bg-purple-400 group-hover:h-2 transition-all"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
