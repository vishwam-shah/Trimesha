"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Icon } from "@iconify/react";

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

function Counter({ end, duration = 2, suffix = "", prefix = "" }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
}

export function AboutStats() {
    const stats = [
        { value: 500, suffix: "+", label: "Projects Delivered", icon: "mdi:rocket-launch" },
        { value: 250, suffix: "+", label: "Happy Clients", icon: "mdi:target" },
        { value: 98, suffix: "%", label: "Success Rate", icon: "mdi:star" },
        { value: 50, suffix: "+", label: "Team Members", icon: "mdi:account-group" },
    ];

    return (
        <section className="relative py-24 bg-muted/30">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-10">
                <svg className="absolute top-0 left-0 w-64 h-64 text-purple-500" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-96 h-96 text-blue-500" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
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
                        Our Impact in Numbers
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Delivering excellence across industries, one project at a time
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-card border border-border rounded-2xl p-8 text-center overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon */}
                            <motion.div
                                className="text-6xl mb-4 flex justify-center"
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Icon icon={stat.icon} className="text-purple-600 dark:text-purple-400" />
                            </motion.div>

                            {/* Counter */}
                            <div className="text-5xl md:text-6xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                                <Counter end={stat.value} suffix={stat.suffix} />
                            </div>

                            {/* Label */}
                            <p className="text-muted-foreground font-medium text-lg">
                                {stat.label}
                            </p>

                            {/* Decorative Line */}
                            <motion.div
                                className="absolute bottom-0 left-0 h-1 bg-purple-600 dark:bg-purple-400"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
