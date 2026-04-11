import { NextResponse } from "next/server";
import { requireAdminAccess } from "@/lib/admin-auth";
import { DEFAULT_CAREER_JOBS } from "@/lib/default-careers";

const DEFAULT_MODEL = "gemini-2.5-flash";

export async function POST(req: Request) {
  const session = await requireAdminAccess();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key?.trim()) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    const body = (await req.json()) as { title?: string };
    const title = String(body.title ?? "").trim();
    if (title.length < 2) {
      return NextResponse.json({ error: "Job title is too short." }, { status: 400 });
    }

    const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
    const examples = JSON.stringify(DEFAULT_CAREER_JOBS, null, 2);

    const systemInstruction =
      `You draft public job listings for Trimesha, a product and technology company. ` +
      `Match the tone, structure, and field patterns of these real listings (your main style reference):\n\n` +
      `${examples}\n\n` +
      `Rules:\n` +
      `- type: similar to "Full-Time (Paid)" or "Unpaid Internship".\n` +
      `- experience: similar to "0–2 Years" or "0 Years (Freshers Welcome)".\n` +
      `- compensation: one clear line for paid roles (stipend/tiers ok); use an empty string for unpaid internships.\n` +
      `- description: 2–4 sentences, concrete and human, like the examples. Do not use em dashes.\n` +
      `- benefits: 4–6 short bullet phrases (array of strings).\n` +
      `- tags: 4–7 short keywords (array of strings).\n` +
      `- Infer sensible choices from the job title alone; stay realistic for an Indian startup context when relevant.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;

    const geminiRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  `Job title: "${title}"\n` +
                  `Return only JSON with keys: type, experience, compensation, description, benefits, tags. ` +
                  `benefits and tags must be arrays of strings. compensation must be a string (can be empty).`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.65,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              type: { type: "string" },
              experience: { type: "string" },
              compensation: { type: "string" },
              description: { type: "string" },
              benefits: {
                type: "array",
                items: { type: "string" },
              },
              tags: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: [
              "type",
              "experience",
              "compensation",
              "description",
              "benefits",
              "tags",
            ],
          },
        },
      }),
    });

    const raw = (await geminiRes.json()) as Record<string, unknown>;

    if (!geminiRes.ok) {
      const msg =
        typeof (raw as { error?: { message?: string } }).error?.message ===
        "string"
          ? (raw as { error: { message: string } }).error.message
          : "Gemini request failed";
      console.error("Gemini careers suggest:", raw);
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const candidates = raw.candidates as
      | { content?: { parts?: { text?: string }[] } }[]
      | undefined;
    const text = candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "No suggestion returned from the model." },
        { status: 502 },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text) as unknown;
    } catch {
      return NextResponse.json(
        { error: "Model returned invalid JSON." },
        { status: 502 },
      );
    }

    const obj = parsed as Record<string, unknown>;
    const suggestion = {
      type: String(obj.type ?? ""),
      experience: String(obj.experience ?? ""),
      compensation:
        obj.compensation === undefined || obj.compensation === null
          ? ""
          : String(obj.compensation),
      description: String(obj.description ?? ""),
      benefits: Array.isArray(obj.benefits)
        ? obj.benefits.map((x) => String(x)).filter(Boolean)
        : [],
      tags: Array.isArray(obj.tags)
        ? obj.tags.map((x) => String(x)).filter(Boolean)
        : [],
    };

    return NextResponse.json(suggestion);
  } catch (e) {
    console.error("POST /api/v1/admin/careers/suggest", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
