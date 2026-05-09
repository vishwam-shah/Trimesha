/**
 * Overwrites DEFAULT_PUBLIC_TEAM_MEMBERS in lib/team-public.ts using the current
 * TeamMember documents in MongoDB (same order as sortPublicTeamMembers).
 *
 * Usage: npm run seed:team-defaults
 * Requires: MONGO_URI in .env / .env.local (loaded via @next/env)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";

import connect from "../dbconfig/dbconnect";
import type { PublicTeamMember } from "../lib/team-public";
import { sortPublicTeamMembers } from "../lib/team-public";
import TeamMember from "../models/TeamMember";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnvConfig(join(__dirname, ".."));

const START = "// SYNC_TEAM_DEFAULTS_START";
const END = "// SYNC_TEAM_DEFAULTS_END";

function leanToPublic(d: Record<string, unknown>): PublicTeamMember {
  return {
    name: String(d.name ?? ""),
    role: String(d.role ?? ""),
    bio: String(d.bio ?? ""),
    quote: String(d.quote ?? ""),
    expertise: Array.isArray(d.expertise)
      ? (d.expertise as unknown[]).map((x) => String(x))
      : [],
    badge: String(d.badge ?? ""),
    badgeColor: String(d.badgeColor ?? ""),
    image: typeof d.image === "string" ? d.image : "",
    hasImage: Boolean(d.hasImage),
    icon: String(d.icon ?? ""),
    isFounder: Boolean(d.isFounder),
  };
}

function memberToTsEntry(m: PublicTeamMember): string {
  const lines: string[] = [];
  lines.push(`  {`);
  lines.push(`    name: ${JSON.stringify(m.name)},`);
  lines.push(`    role: ${JSON.stringify(m.role)},`);
  lines.push(`    image: ${JSON.stringify(m.image)},`);
  lines.push(`    hasImage: ${m.hasImage},`);
  lines.push(`    badge: ${JSON.stringify(m.badge)},`);
  lines.push(`    badgeColor: ${JSON.stringify(m.badgeColor)},`);
  lines.push(`    bio: ${JSON.stringify(m.bio)},`);
  lines.push(`    expertise: [`);
  for (const x of m.expertise) {
    lines.push(`      ${JSON.stringify(x)},`);
  }
  lines.push(`    ],`);
  lines.push(`    quote: ${JSON.stringify(m.quote)},`);
  lines.push(`    icon: ${JSON.stringify(m.icon)},`);
  lines.push(`    isFounder: ${m.isFounder},`);
  lines.push(`  }`);
  return lines.join("\n");
}

async function main() {
  await connect();
  const docs = await TeamMember.find().lean();
  if (docs.length === 0) {
    console.error("No documents in TeamMember collection; nothing to export.");
    console.error(
      "If the DB is new, run: npm run seed:team-collection  (loads defaults from lib/team-public.ts), then try again.",
    );
    process.exitCode = 1;
    return;
  }

  const members = sortPublicTeamMembers(docs.map((d) => leanToPublic(d as Record<string, unknown>)));
  const arrayInner = members.map((m) => memberToTsEntry(m)).join(",\n");

  const newBlock = `${START}
export const DEFAULT_PUBLIC_TEAM_MEMBERS: PublicTeamMember[] = [
${arrayInner},
];
${END}`;

  const filePath = join(__dirname, "..", "lib", "team-public.ts");
  const src = readFileSync(filePath, "utf8");
  const startIdx = src.indexOf(START);
  const endIdx = src.indexOf(END);
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    console.error("Could not find SYNC_TEAM_DEFAULTS markers in lib/team-public.ts");
    process.exitCode = 1;
    return;
  }

  const before = src.slice(0, startIdx);
  const after = src.slice(endIdx + END.length);
  const out = `${before}${newBlock}${after}`;
  writeFileSync(filePath, out, "utf8");
  console.log(`Updated DEFAULT_PUBLIC_TEAM_MEMBERS with ${members.length} row(s) from MongoDB.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect().catch(() => {}));
