import { NextResponse } from "next/server";
import { Resend } from "resend";

function esc(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatWhen(dateIso: string, timeLabel: string): string {
  if (!dateIso) return timeLabel || "Time not specified";
  const d = new Date(dateIso);
  if (!Number.isFinite(d.getTime())) {
    return `${dateIso} · ${timeLabel}`.trim();
  }
  const datePart = d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return timeLabel ? `${datePart} at ${timeLabel}` : datePart;
}

const adminEmail =
  process.env.BOOKING_ADMIN_EMAIL?.trim() || "admin@trimesha.com";

/** Always CC on booking mail unless it would duplicate the primary recipient. */
const BOOKING_CC = "admin@trimesha.com";

function ccForRecipient(primaryTo: string): string[] | undefined {
  if (primaryTo.trim().toLowerCase() === BOOKING_CC.toLowerCase()) {
    return undefined;
  }
  return [BOOKING_CC];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const packageTitle = String(body.packageTitle ?? "Discovery call");
    const duration = String(body.duration ?? "");
    const price = String(body.price ?? "");
    const date = String(body.date ?? "");
    const time = String(body.time ?? "");
    const name = String(body.name ?? "");
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "");
    const notes = String(body.notes ?? "");
    const googleCalendarUrl =
      typeof body.googleCalendarUrl === "string" ? body.googleCalendarUrl : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const whenLine = formatWhen(date, time);

    if (!process.env.RESEND_API_KEY) {
      console.warn(
        "RESEND_API_KEY not configured. Booking received but emails not sent.",
      );
      return NextResponse.json({ ok: true, emailed: false }, { status: 200 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL ?? "bookings@notifications.trimesha.com";

    const adminHtml = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:28px;border:1px solid #e9e4ff;border-radius:14px;background:#faf8ff;">
        <h1 style="color:#5b21b6;font-size:20px;margin:0 0 8px;">New discovery call booked</h1>
        <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.5;">
          Someone just submitted a booking through the Trimesha site. Reply to them at <a href="mailto:${esc(email)}" style="color:#6d28d9;">${esc(email)}</a> to confirm the video link and anything you need from them beforehand.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1e293b;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>When</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(whenLine)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>Session</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(packageTitle)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>Duration</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(duration || "Not specified")}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>Price</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(price || "Not specified")}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>Name</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(name || "Not provided")}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;"><strong>Phone</strong></td><td style="padding:8px 0;border-bottom:1px solid #e9e4ff;">${esc(phone || "Not provided")}</td></tr>
          <tr><td style="padding:8px 0;vertical-align:top;"><strong>Notes</strong></td><td style="padding:8px 0;">${esc(notes || "None")}</td></tr>
        </table>
        ${
          googleCalendarUrl
            ? `<p style="margin-top:20px;"><a href="${esc(googleCalendarUrl)}" style="display:inline-block;padding:10px 18px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Open Google Calendar draft</a></p>`
            : ""
        }
        <p style="margin-top:24px;font-size:12px;color:#64748b;">This message was sent automatically by the Trimesha booking form.</p>
      </div>
    `;

    const guestHtml = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:28px;border:1px solid #e9e4ff;border-radius:14px;background:#ffffff;">
        <h1 style="color:#5b21b6;font-size:20px;margin:0 0 8px;">You are booked with Trimesha</h1>
        <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.55;">
          Hi ${esc(name || "there")},
        </p>
        <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.55;">
          Thanks for scheduling a <strong>${esc(packageTitle)}</strong>. Here is a summary of what we have on file:
        </p>
        <div style="background:#f5f3ff;border-radius:12px;padding:18px 20px;margin:20px 0;">
          <p style="margin:0 0 10px;font-size:15px;color:#1e293b;"><strong>When:</strong> ${esc(whenLine)}</p>
          <p style="margin:0 0 10px;font-size:15px;color:#1e293b;"><strong>Duration:</strong> ${esc(duration || "As agreed")}</p>
          <p style="margin:0;font-size:15px;color:#1e293b;"><strong>Notes you shared:</strong> ${esc(notes || "None")}</p>
        </div>
        <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.55;">
          Our team will follow up at this address (<strong>${esc(email)}</strong>) with a video call link and anything we need before the conversation. If none of the above looks right, just reply to this email.
        </p>
        ${
          googleCalendarUrl
            ? `<p style="margin:20px 0;"><a href="${esc(googleCalendarUrl)}" style="display:inline-block;padding:10px 18px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">Add to Google Calendar</a></p>`
            : ""
        }
        <p style="margin-top:24px;font-size:13px;color:#94a3b8;">Trimesha</p>
      </div>
    `;

    const adminCc = ccForRecipient(adminEmail);
    const guestCc = ccForRecipient(email);

    const [adminOut, guestOut] = await Promise.all([
      resend.emails.send({
        from,
        to: adminEmail,
        ...(adminCc ? { cc: adminCc } : {}),
        replyTo: email,
        subject: `[Trimesha] New booking: ${packageTitle} from ${name || email}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from,
        to: email,
        ...(guestCc ? { cc: guestCc } : {}),
        subject: `Your Trimesha call: ${packageTitle} on ${whenLine}`,
        html: guestHtml,
      }),
    ]);

    if (adminOut.error) {
      console.error("booking-request admin email", adminOut.error);
      return NextResponse.json({ error: "Failed to notify team" }, { status: 502 });
    }
    if (guestOut.error) {
      console.error("booking-request guest email", guestOut.error);
      return NextResponse.json(
        { error: "Booking saved but confirmation email failed. We will follow up manually." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, emailed: true }, { status: 200 });
  } catch (e) {
    console.error("booking-request", e);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
