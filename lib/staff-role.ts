/** Dashboard + product admin (not end users) */
export function isStaffRole(role: string | undefined): boolean {
  return role === "admin" || role === "superadmin"
}
