"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ApplicationFormProps {
    jobTitle: string;
    onClose: () => void;
}

export function ApplicationForm({ jobTitle, onClose }: ApplicationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        resumeLink: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/v1/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, jobTitle }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.mock) {
                    alert("Application successful, but email sending is NOT configured. Please add SMTP credentials to .env.local to receive real emails.");
                }
                setIsSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 5000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <Icon icon="line-md:confirm-circle" className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Application Received!</h3>
                <p className="text-muted-foreground">
                    Thank you for applying for the {jobTitle} position. We'll be in touch soon.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="experience">Experience (Keep it 0 if fresher)</Label>
                <Textarea
                    id="experience"
                    name="experience"
                    placeholder="Briefly describe your background or interest in this role..."
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="resumeLink">Resume Link (Google Drive/Dropbox)</Label>
                <Input
                    id="resumeLink"
                    name="resumeLink"
                    placeholder="https://link-to-your-resume.com"
                    required
                    value={formData.resumeLink}
                    onChange={handleChange}
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Icon icon="line-md:loading-twotone-loop" className="w-5 h-5" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Application
                            <Icon icon="line-md:arrow-right" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
