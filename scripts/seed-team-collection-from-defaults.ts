/**
 * Inserts `DEFAULT_PUBLIC_TEAM_MEMBERS` into MongoDB when the TeamMember
 * collection is empty (safe to run once after a fresh DB).
 *
 * Usage: npm run seed:team-collection
 * Then (optional): npm run seed:team-defaults  to snapshot DB back into lib/team-public.ts
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { loadEnvConfig } from "@next/env";
import mongoose from "mongoose";

import connect from "../dbconfig/dbconnect";
import { DEFAULT_PUBLIC_TEAM_MEMBERS } from "../lib/team-public";
import TeamMember from "../models/TeamMember";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnvConfig(join(__dirname, ".."));

async function main() {
  await connect();
  const count = await TeamMember.countDocuments();
  if (count > 0) {
    console.log(
      `TeamMember already has ${count} document(s). Nothing inserted. (Delete documents first if you need a full reseed.)`,
    );
    return;
  }

  const docs = DEFAULT_PUBLIC_TEAM_MEMBERS.map((m) => ({ ...m }));
  await TeamMember.insertMany(docs);
  console.log(`Inserted ${docs.length} team member(s) from DEFAULT_PUBLIC_TEAM_MEMBERS.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect().catch(() => {}));
