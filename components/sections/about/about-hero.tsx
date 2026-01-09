"use client";

import { motion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";

export function AboutHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
            {/* Spotlight Effects - More visible in light mode */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgb(139, 92, 246)" />
            <Spotlight className="top-10 left-full md:left-80 md:top-20" fill="rgb(59, 130, 246)" />
            <Spotlight className="-top-20 right-full md:right-60 md:top-10" fill="rgb(168, 85, 247)" />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(139,92,246)_1px,transparent_1px),linear-gradient(to_bottom,rgb(139,92,246)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
            </div>

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"
                animate={{
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        Transforming Ideas Into
                        <br />
                        <span className="text-purple-600 dark:text-purple-400">Digital Excellence</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        We are <span className="text-foreground font-semibold">TRIMESHA</span>, a team of passionate innovators dedicated to crafting cutting-edge digital solutions that empower businesses to thrive in the modern world.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <a
                            href="#mission"
                            className="group relative px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50 hover:bg-purple-700"
                        >
                            <span className="relative z-10">Our Mission</span>
                        </a>
                        <a
                            href="#values"
                            className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 font-semibold rounded-xl hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white dark:hover:border-purple-600 transition-all"
                        >
                            Our Values
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
