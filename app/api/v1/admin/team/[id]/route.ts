import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbconfig/dbconnect";
import TeamMember, { type ITeamMember } from "@/models/TeamMember";
import { requireSuperAdmin } from "@/lib/admin-auth";
import { toAdminRow } from "@/lib/team-public";

const DEFAULT_TEAM_BADGE = "Team";
const DEFAULT_TEAM_BADGE_COLOR = "from-violet-500 to-purple-600";

type Ctx = { params: Promise<{ id: string }> };

function applyPatch(
  target: mongoose.Document<unknown, object, ITeamMember> & ITeamMember,
  body: Record<string, unknown>,
) {
  if (typeof body.name === "string") target.name = body.name.trim();
  if (typeof body.role === "string") target.role = body.role.trim();
  if (typeof body.bio === "string") target.bio = body.bio.trim();
  if (typeof body.quote === "string") target.quote = body.quote.trim();
  if (typeof body.badge === "string")
    target.badge = body.badge.trim() || DEFAULT_TEAM_BADGE;
  if (typeof body.badgeColor === "string")
    target.badgeColor = body.badgeColor.trim() || DEFAULT_TEAM_BADGE_COLOR;
  if (typeof body.image === "string") target.image = body.image.trim();
  if (typeof body.icon === "string") target.icon = body.icon.trim();
  if (body.hasImage === true || body.hasImage === false)
    target.hasImage = body.hasImage;
  if (body.isFounder === true || body.isFounder === false)
    target.isFounder = body.isFounder;

  if (Array.isArray(body.expertise)) {
    target.expertise = body.expertise
      .map((x) => (typeof x === "string" ? x.trim() : ""))
      .filter(Boolean);
    target.markModified("expertise");
  } else if (typeof body.expertise === "string") {
    target.expertise = body.expertise
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    target.markModified("expertise");
  }
}

export async function PATCH(req: Request, ctx: Ctx) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    await connect();
    const target = await TeamMember.findById(id);
    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    applyPatch(target, body);
    await target.save();
    return NextResponse.json(toAdminRow(target.toObject()));
  } catch (e) {
    console.error("PATCH /api/v1/admin/team/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await ctx.params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await connect();
    const deleted = await TeamMember.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/v1/admin/team/[id]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
