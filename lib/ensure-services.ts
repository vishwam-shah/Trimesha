import { connect } from "@/dbconfig/dbconnect";
import Service from "@/models/Service";
import { DEFAULT_SERVICES } from "@/lib/default-services";

/** Seeds the services collection when empty (same defaults as public list API). */
export async function ensureDefaultServices() {
  await connect();
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(
      DEFAULT_SERVICES.map((s, i) => ({ ...s, sortOrder: i })),
    );
  }
}
