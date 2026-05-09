import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconnect";
import TeamMember from "@/models/TeamMember";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { sortPublicTeamMembers, toAdminRow } from "@/lib/team-public";
import type { AdminTeamMemberRow } from "@/lib/team-public";

const DEFAULT_TEAM_BADGE = "Team";
const DEFAULT_TEAM_BADGE_COLOR = "from-violet-500 to-purple-600";

function parseBody(body: Record<string, unknown>) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const quote = typeof body.quote === "string" ? body.quote.trim() : "";
  const badgeRaw = typeof body.badge === "string" ? body.badge.trim() : "";
  const badgeColorRaw =
    typeof body.badgeColor === "string" ? body.badgeColor.trim() : "";
  const badge = badgeRaw || DEFAULT_TEAM_BADGE;
  const badgeColor = badgeColorRaw || DEFAULT_TEAM_BADGE_COLOR;
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const icon = typeof body.icon === "string" ? body.icon.trim() : "";
  const hasImage = body.hasImage === true;
  const isFounder = body.isFounder === true;

  let expertise: string[] = [];
  if (Array.isArray(body.expertise)) {
    expertise = body.expertise
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
  } else if (typeof body.expertise === "string") {
    expertise = body.expertise
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return {
    name,
    role,
    bio,
    quote,
    badge,
    badgeColor,
    image,
    icon,
    hasImage,
    isFounder,
    expertise,
  };
}

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connect();
    const docs = await TeamMember.find().sort({ updatedAt: -1 }).lean();
    const rows: AdminTeamMemberRow[] = docs.map((d) => toAdminRow(d));
    return NextResponse.json(sortPublicTeamMembers(rows));
  } catch (e) {
    console.error("GET /api/v1/admin/team", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = parseBody((await req.json()) as Record<string, unknown>);
    if (!body.name || !body.role || !body.bio || !body.quote || !body.icon) {
      return NextResponse.json(
        { error: "Missing required fields (name, role, bio, quote, icon)." },
        { status: 400 },
      );
    }

    await connect();
    const doc = await TeamMember.create({
      name: body.name,
      role: body.role,
      bio: body.bio,
      quote: body.quote,
      expertise: body.expertise,
      badge: body.badge,
      badgeColor: body.badgeColor,
      image: body.image,
      hasImage: body.hasImage,
      icon: body.icon,
      isFounder: body.isFounder,
    });

    return NextResponse.json(toAdminRow(doc.toObject()), { status: 201 });
  } catch (e) {
    console.error("POST /api/v1/admin/team", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
