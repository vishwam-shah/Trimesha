import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, experience, resumeLink, jobTitle } = body;

        console.log("New job application received:", { name, email, phone, experience, resumeLink, jobTitle });

        return NextResponse.json({ message: "Application submitted successfully" }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
