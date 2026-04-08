import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, experience, resumeLink, jobTitle } = body;

        if (!process.env.RESEND_API_KEY) {
            console.warn("RESEND_API_KEY not configured. Application received but email not sent.");
            console.log("Application details:", { name, email, jobTitle });
            return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = process.env.RESEND_FROM_EMAIL ?? "careers@notifications.trimesha.com";

        await resend.emails.send({
            from,
            to: "admin@trimesha.com",
            subject: `New Job Application: ${jobTitle} - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #6d28d9; text-align: center;">New Job Application</h2>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Job Title:</strong> ${jobTitle}</p>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Experience/Bio:</strong><br/>${experience || "N/A"}</p>
                    <p><strong>Resume Link:</strong> <a href="${resumeLink}" style="color: #6d28d9;">View Resume</a></p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #666; text-align: center;">This application was submitted via Trimesha Careers Portal.</p>
                </div>
            `,
        });

        return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
