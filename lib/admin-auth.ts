import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "superadmin") {
    return null;
  }
  return session;
}
