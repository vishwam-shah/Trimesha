"use client";

import { useEffect, useState } from "react";
import type { AdminTeamMemberRow } from "@/lib/team-public";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_BADGE = "Team";
const DEFAULT_BADGE_COLOR = "from-violet-500 to-purple-600";

const emptyForm = () => ({
  name: "",
  role: "",
  bio: "",
  quote: "",
  expertiseText: "",
  image: "",
  hasImage: false,
  icon: "ph:user-duotone",
});

export default function DashboardTeamPage() {
  const [rows, setRows] = useState<AdminTeamMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(() => emptyForm());
  const [saving, setSaving] = useState(false);

  async function load() {
    setErr(null);
    const r = await fetch("/api/v1/admin/team");
    if (!r.ok) {
      setErr("Could not load team.");
      setLoading(false);
      return;
    }
    const data = (await r.json()) as AdminTeamMemberRow[];
    setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function rowToForm(u: AdminTeamMemberRow) {
    setForm({
      name: u.name,
      role: u.role,
      bio: u.bio,
      quote: u.quote,
      expertiseText: u.expertise.join("\n"),
      image: u.image,
      hasImage: u.hasImage,
      icon: u.icon,
    });
  }

  function openCreate() {
    setMsg(null);
    setErr(null);
    setEditId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  }

  function openEdit(u: AdminTeamMemberRow) {
    setMsg(null);
    setErr(null);
    setEditId(u.id);
    rowToForm(u);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditId(null);
    setSaving(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setSaving(true);
    const expertise = form.expertiseText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = {
      name: form.name.trim(),
      role: form.role.trim(),
      bio: form.bio.trim(),
      quote: form.quote.trim(),
      expertise,
      badge: DEFAULT_BADGE,
      badgeColor: DEFAULT_BADGE_COLOR,
      image: form.image.trim(),
      hasImage: form.hasImage,
      icon: form.icon.trim(),
      isFounder: false,
    };

    if (!payload.name || !payload.role || !payload.bio || !payload.quote || !payload.icon) {
      setErr("Fill in name, role, bio, quote, and icon.");
      setSaving(false);
      return;
    }

    try {
      if (editId) {
        const r = await fetch(`/api/v1/admin/team/${editId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          setErr(typeof j.error === "string" ? j.error : "Update failed");
          return;
        }
        setMsg("Team member updated.");
      } else {
        const r = await fetch("/api/v1/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          setErr(typeof j.error === "string" ? j.error : "Create failed");
          return;
        }
        setMsg("Team member added.");
      }
      closeDialog();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function removeRow(u: AdminTeamMemberRow) {
    setErr(null);
    setMsg(null);
    if (!confirm(`Remove ${u.name} from the About page team?`)) return;
    const r = await fetch(`/api/v1/admin/team/${u.id}`, { method: "DELETE" });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      setErr(typeof j.error === "string" ? j.error : "Delete failed");
      return;
    }
    setMsg("Removed.");
    await load();
  }

  return (
    <div className="space-y-8">
      {msg ? (
        <p className="text-sm text-green-600 dark:text-green-400">{msg}</p>
      ) : null}
      {err ? <p className="text-sm text-destructive">{err}</p> : null}

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-medium">About page: Team</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Manage people shown in Meet the Team. Members are ordered with
              founders first (if any), then alphabetically. If the database is
              empty, the site uses built-in defaults until you add rows here.
            </p>
          </div>
          <Button type="button" onClick={openCreate}>
            Add member
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No saved members yet. The public site still shows default content.
            Click <strong>Add member</strong> to store team data in the database.
          </p>
        ) : (
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border/80 last:border-0"
                >
                  <td className="py-3 pr-4 align-middle font-medium">{u.name}</td>
                  <td className="max-w-[min(100%,280px)] py-3 pr-4 align-middle text-muted-foreground">
                    <span className="line-clamp-2">{u.role}</span>
                  </td>
                  <td className="py-3 align-middle text-right">
                    <div className="flex flex-wrap justify-end gap-2">
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
                        onClick={() => removeRow(u)}
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Dialog open={dialogOpen} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
          <form onSubmit={save}>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Edit team member" : "Add team member"}
              </DialogTitle>
              <DialogDescription>
                These fields map to the public About page. Icon uses{" "}
                <a
                  href="https://icon-sets.iconify.design/ph/"
                  className="text-primary underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Phosphor
                </a>{" "}
                IDs (e.g. ph:code-duotone).
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tm-name">Name</Label>
                <Input
                  id="tm-name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-role">Role</Label>
                <Input
                  id="tm-role"
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-icon">Icon (Iconify id)</Label>
                <Input
                  id="tm-icon"
                  value={form.icon}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, icon: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-image">Image URL path</Label>
                <Input
                  id="tm-image"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  placeholder="/testimonial/photo.jpeg"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="tm-hasimg"
                  type="checkbox"
                  className="size-4 rounded border-input"
                  checked={form.hasImage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, hasImage: e.target.checked }))
                  }
                />
                <Label htmlFor="tm-hasimg" className="font-normal">
                  Show image (if unchecked, initials placeholder is used)
                </Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-quote">Quote</Label>
                <Textarea
                  id="tm-quote"
                  value={form.quote}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, quote: e.target.value }))
                  }
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-bio">Bio</Label>
                <Textarea
                  id="tm-bio"
                  value={form.bio}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bio: e.target.value }))
                  }
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tm-exp">Expertise (one per line)</Label>
                <Textarea
                  id="tm-exp"
                  value={form.expertiseText}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expertiseText: e.target.value }))
                  }
                  rows={4}
                  placeholder="React&#10;Node.js"
                />
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
                {saving ? "Saving…" : editId ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
