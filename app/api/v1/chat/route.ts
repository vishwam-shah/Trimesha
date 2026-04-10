import { NextResponse } from "next/server";
import { buildChatbotSystemInstruction } from "@/lib/chatbot-context";

const DEFAULT_MODEL = "gemini-2.5-flash";

type ChatMessage = { role: string; content: string };

function toGeminiContents(messages: ChatMessage[]) {
  const firstUser = messages.findIndex((m) => m.role === "user");
  if (firstUser < 0) return [];
  return messages.slice(firstUser).map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: String(m.content ?? "").slice(0, 12_000) }],
  }));
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key?.trim()) {
    return NextResponse.json(
      { error: "Chat is not configured (missing GEMINI_API_KEY)." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: "messages must be a non-empty array." }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  for (const item of rawMessages) {
    if (!item || typeof item !== "object") continue;
    const r = (item as { role?: unknown; content?: unknown }).role;
    const c = (item as { content?: unknown }).content;
    if (r !== "user" && r !== "bot") continue;
    const content = typeof c === "string" ? c.trim() : "";
    if (!content) continue;
    messages.push({ role: r, content });
  }

  if (messages.length === 0 || !messages.some((m) => m.role === "user")) {
    return NextResponse.json({ error: "At least one user message is required." }, { status: 400 });
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user") {
    return NextResponse.json({ error: "Last message must be from the user." }, { status: 400 });
  }

  const trimmed = messages.slice(-24);
  const contents = toGeminiContents(trimmed);
  if (contents.length === 0) {
    return NextResponse.json({ error: "Could not build conversation." }, { status: 400 });
  }

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const systemInstruction = buildChatbotSystemInstruction();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;

  try {
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents,
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: 1024,
        },
      }),
    });

    const raw = (await geminiRes.json()) as Record<string, unknown>;

    if (!geminiRes.ok) {
      const msg =
        typeof (raw as { error?: { message?: string } }).error?.message === "string"
          ? (raw as { error: { message: string } }).error.message
          : "Assistant request failed";
      console.error("Gemini chat:", raw);
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const candidates = raw.candidates as
      | { content?: { parts?: { text?: string }[] } }[]
      | undefined;
    const text = candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
    const reply = text.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "No reply returned from the assistant." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (e) {
    console.error("POST /api/v1/chat", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
