import type { CareerJob } from "@/types/career-job";

/** Initial listings — same content as the original hardcoded `job-listings.tsx`. */
export const DEFAULT_CAREER_JOBS: Omit<CareerJob, "sortOrder">[] = [
  {
    title: "Full Stack Developer",
    type: "Full-Time (Paid)",
    experience: "0–2 Years",
    compensation:
      "Month 1: Fixed Probation Stipend · Month 2+: Performance-Based Pay",
    description:
      "We are looking for a passionate Full Stack Developer to join the Trimesha core team. You will work on real-world client projects — building scalable web apps, REST APIs, and intuitive UIs using modern tech stacks like Next.js, Node.js, and PostgreSQL. The first month is a paid probation period to help you settle in; from month two onwards, your compensation grows with your performance and contribution.",
    benefits: [
      "Paid Probation Period (Month 1)",
      "Performance-Based Salary (Month 2+)",
      "Real Client Projects",
      "Mentorship & Code Reviews",
      "Flexible Remote Work",
      "Fast Career Growth",
    ],
    tags: ["Full-Time", "Paid", "Full Stack", "Remote", "Next.js", "Node.js"],
  },
  {
    title: "Social Media Manager Intern",
    type: "Unpaid Internship",
    experience: "0 Years (Freshers Welcome)",
    compensation: "",
    description:
      "We are looking for a creative and passionate Social Media Manager Intern to manage our social media presence and engage with our community. This is a unpaid internship and intern gets to learn a lot of things which he can learn from startups.",
    benefits: [
      "Certificate of Completion",
      "Certificate of Experience",
      "Professional Mentorship",
      "Flexible Working Hours",
    ],
    tags: ["Social Media", "Marketing", "Internship", "Remote"],
  },
  {
    title: "LinkedIn and Outreach Manager Intern",
    type: "Unpaid Internship",
    experience: "0 Years (Freshers Welcome)",
    compensation: "",
    description:
      "We are looking for a driven LinkedIn and Outreach Manager Intern to manage our professional network and lead generation. This is a unpaid internship and intern gets to learn a lot of things which he can learn from startups.",
    benefits: [
      "Certificate of Completion",
      "Certificate of Experience",
      "Professional Mentorship",
      "Flexible Working Hours",
    ],
    tags: ["LinkedIn", "Outreach", "Internship", "Remote"],
  },
];
