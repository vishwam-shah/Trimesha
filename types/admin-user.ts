export type AdminUserRole = "user" | "admin" | "superadmin"

export type AdminUserRow = {
  id: string
  email: string
  name: string
  role: AdminUserRole
  createdAt: string
  updatedAt: string
}
