"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import type { AdminUserRow, AdminUserRole } from "@/types/admin-user"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const selectClass = cn(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
)

export default function DashboardUsersPage() {
  const { data: session } = useSession()
  const myId = session?.user?.id ?? ""

  const [users, setUsers] = useState<AdminUserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<AdminUserRole>("user")
  const [password, setPassword] = useState("")
  const [saving, setSaving] = useState(false)

  async function load() {
    setErr(null)
    const r = await fetch("/api/admin/users")
    if (!r.ok) {
      setErr("Could not load users.")
      setLoading(false)
      return
    }
    const data = (await r.json()) as AdminUserRow[]
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function openEdit(u: AdminUserRow) {
    setMsg(null)
    setErr(null)
    setEditId(u.id)
    setName(u.name)
    setEmail(u.email)
    setRole(u.role)
    setPassword("")
    setDialogOpen(true)
  }

  function closeDialog() {
    setDialogOpen(false)
    setEditId(null)
    setPassword("")
    setSaving(false)
  }

  async function saveEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editId) return
    setErr(null)
    setMsg(null)
    setSaving(true)
    try {
      const body: Record<string, string> = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role,
      }
      if (password.trim()) {
        body.password = password
      }
      const r = await fetch(`/api/admin/users/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) {
        setErr(typeof j.error === "string" ? j.error : "Update failed")
        setSaving(false)
        return
      }
      setMsg("User updated.")
      closeDialog()
      await load()
    } finally {
      setSaving(false)
    }
  }

  async function removeUser(u: AdminUserRow) {
    setErr(null)
    setMsg(null)
    if (u.id === myId) {
      setErr("You cannot delete your own account.")
      return
    }
    if (!confirm(`Delete user ${u.email}? This cannot be undone.`)) return
    const r = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) {
      setErr(typeof j.error === "string" ? j.error : "Delete failed")
      return
    }
    setMsg("User deleted.")
    await load()
  }

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString()
    } catch {
      return iso
    }
  }

  return (
    <div className="space-y-8">
      {msg ? (
        <p className="text-sm text-green-600 dark:text-green-400">{msg}</p>
      ) : null}
      {err ? <p className="text-sm text-destructive">{err}</p> : null}

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-medium">
          All users ({users.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Email</th>
                  <th className="pb-3 pr-4 font-medium">Name</th>
                  <th className="pb-3 pr-4 font-medium">Role</th>
                  <th className="pb-3 pr-4 font-medium">Joined</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-border/80 last:border-0"
                  >
                    <td className="py-3 pr-4 align-middle font-medium">
                      {u.email}
                    </td>
                    <td className="py-3 pr-4 align-middle text-muted-foreground">
                      {u.name || "—"}
                    </td>
                    <td className="py-3 pr-4 align-middle">
                      <Badge
                        variant={
                          u.role === "superadmin"
                            ? "secondary"
                            : u.role === "admin"
                              ? "default"
                              : "outline"
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 align-middle text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </td>
                    <td className="py-3 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => openEdit(u)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={u.id === myId}
                          title={
                            u.id === myId
                              ? "You cannot delete yourself"
                              : undefined
                          }
                          onClick={() => removeUser(u)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={dialogOpen} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <form onSubmit={saveEdit}>
            <DialogHeader>
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>
                Change name, email, role, or set a new password (optional).
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <select
                  id="edit-role"
                  className={selectClass}
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as AdminUserRole)
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                  <option value="superadmin">superadmin</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-password">New password</Label>
                <Input
                  id="edit-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                />
                <p className="text-xs text-muted-foreground">
                  At least 8 characters if you change it.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={closeDialog}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
