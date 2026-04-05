import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { isStaffRole } from "@/lib/staff-role";

/** Products and other non–user-admin APIs */
export async function requireAdminAccess() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !isStaffRole(session.user.role)) {
    return null;
  }
  return session;
}

/** User management APIs only */
export async function requireSuperAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "superadmin") {
    return null;
  }
  return session;
}
