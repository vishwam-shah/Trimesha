"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from "@/components/ui/animated-modal";
import { ApplicationForm } from "./application-form";

const positions = [
    {
        title: "Full Stack Developer",
        type: "Full-Time (Paid)",
        experience: "0–2 Years",
        compensation: "Month 1: Fixed Probation Stipend · Month 2+: Performance-Based Pay",
        description: "We are looking for a passionate Full Stack Developer to join the Trimesha core team. You will work on real-world client projects — building scalable web apps, REST APIs, and intuitive UIs using modern tech stacks like Next.js, Node.js, and PostgreSQL. The first month is a paid probation period to help you settle in; from month two onwards, your compensation grows with your performance and contribution.",
        benefits: [
            "Paid Probation Period (Month 1)",
            "Performance-Based Salary (Month 2+)",
            "Real Client Projects",
            "Mentorship & Code Reviews",
            "Flexible Remote Work",
            "Fast Career Growth"
        ],
        tags: ["Full-Time", "Paid", "Full Stack", "Remote", "Next.js", "Node.js"]
    },
    {
        title: "Social Media Manager Intern",
        type: "Unpaid Internship",
        experience: "0 Years (Freshers Welcome)",
        compensation: null,
        description: "We are looking for a creative and passionate Social Media Manager Intern to manage our social media presence and engage with our community. This is a unpaid internship and intern gets to learn a lot of things which he can learn from startups.",
        benefits: [
            "Certificate of Completion",
            "Certificate of Experience",
            "Professional Mentorship",
            "Flexible Working Hours"
        ],
        tags: ["Social Media", "Marketing", "Internship", "Remote"]
    },
    {
        title: "LinkedIn and Outreach Manager Intern",
        type: "Unpaid Internship",
        experience: "0 Years (Freshers Welcome)",
        compensation: null,
        description: "We are looking for a driven LinkedIn and Outreach Manager Intern to manage our professional network and lead generation. This is a unpaid internship and intern gets to learn a lot of things which he can learn from startups.",
        benefits: [
            "Certificate of Completion",
            "Certificate of Experience",
            "Professional Mentorship",
            "Flexible Working Hours"
        ],
        tags: ["LinkedIn", "Outreach", "Internship", "Remote"]
    }
];

export function JobListings() {
    return (
        <section id="open-positions" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Open Positions</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore our latest career opportunities and join our mission to redefine digital excellence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8">
                    {positions.map((job, index) => (
                        <motion.div
                            key={job.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-3xl bg-white dark:bg-gray-900 border border-violet-200/50 dark:border-violet-800/30 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-500 overflow-hidden"
                        >
                            {/* Decorative background glow */}
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl group-hover:bg-violet-500/20 transition-all duration-500" />

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-xs font-semibold bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                        {job.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <Icon icon="line-md:briefcase-twotone" className="w-4 h-4" />
                                            {job.type}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Icon icon="line-md:person-twotone" className="w-4 h-4" />
                                            Experience: {job.experience}
                                        </div>
                                    </div>
                                    {job.compensation && (
                                        <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/40 w-fit">
                                            <Icon icon="line-md:money" className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{job.compensation}</span>
                                        </div>
                                    )}
                                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                                        {job.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {job.benefits.map((benefit, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                                    <Icon icon="line-md:confirm" className="w-3 h-3 text-green-600 dark:text-green-400" />
                                                </div>
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <Modal>
                                        <ModalTrigger asChild>
                                            <button className="w-full md:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2 group/btn">
                                                Apply Now
                                                <Icon icon="line-md:arrow-right" className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </ModalTrigger>
                                        <ModalBody className="max-w-2xl bg-white dark:bg-neutral-950">
                                            <div className="absolute top-4 left-6 z-10">
                                                <h2 className="text-2xl font-bold text-foreground">Apply for {job.title}</h2>
                                                <p className="text-sm text-muted-foreground">{job.type}</p>
                                            </div>
                                            <ModalContent className="overflow-y-auto mt-12">
                                                <ApplicationForm jobTitle={job.title} onClose={() => { }} />
                                            </ModalContent>
                                        </ModalBody>
                                    </Modal>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
