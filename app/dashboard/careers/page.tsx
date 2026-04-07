"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CareerJobWithId } from "@/types/career-job";

const empty = {
  id: null as string | null,
  title: "",
  type: "",
  experience: "",
  compensation: "",
  description: "",
  benefitsStr: "",
  tagsStr: "",
  sortOrder: "" as number | "",
};

export default function DashboardCareersPage() {
  const [jobs, setJobs] = useState<CareerJobWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/v1/careers");
    if (!r.ok) {
      setErr("Could not load job listings.");
      setLoading(false);
      return;
    }
    const data = (await r.json()) as CareerJobWithId[];
    setJobs(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(j: CareerJobWithId) {
    setForm({
      id: j.id,
      title: j.title,
      type: j.type,
      experience: j.experience,
      compensation: j.compensation ?? "",
      description: j.description,
      benefitsStr: j.benefits.join(", "),
      tagsStr: j.tags.join(", "),
      sortOrder: j.sortOrder,
    });
    setMsg(null);
    setErr(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearForm() {
    setForm(empty);
    setMsg(null);
    setErr(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setSaving(true);
    try {
      const benefits = form.benefitsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const tags = form.tagsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const sortOrderNum =
        form.sortOrder === "" ? undefined : Number(form.sortOrder);

      const payload = {
        title: form.title,
        type: form.type,
        experience: form.experience,
        compensation: form.compensation,
        description: form.description,
        benefits,
        tags,
        ...(form.id &&
        sortOrderNum !== undefined &&
        Number.isFinite(sortOrderNum)
          ? { sortOrder: sortOrderNum }
          : {}),
      };

      if (form.id) {
        const r = await fetch(`/api/v1/admin/careers/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          setErr(typeof j.error === "string" ? j.error : "Update failed");
          setSaving(false);
          return;
        }
        setMsg("Opening updated.");
      } else {
        const r = await fetch("/api/v1/admin/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          setErr(typeof j.error === "string" ? j.error : "Create failed");
          setSaving(false);
          return;
        }
        setMsg("Opening added.");
      }
      clearForm();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this job listing?")) return;
    setErr(null);
    const r = await fetch(`/api/v1/admin/careers/${id}`, { method: "DELETE" });
    if (!r.ok) {
      setErr("Delete failed.");
      return;
    }
    if (form.id === id) clearForm();
    setMsg("Opening deleted.");
    await load();
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">
          {form.id ? "Edit opening" : "Add opening"}
        </h2>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Job title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                placeholder="Full-Time (Paid)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={form.experience}
                onChange={(e) =>
                  setForm((f) => ({ ...f, experience: e.target.value }))
                }
                placeholder="0–2 Years"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="compensation">Compensation (optional)</Label>
              <Input
                id="compensation"
                value={form.compensation}
                onChange={(e) =>
                  setForm((f) => ({ ...f, compensation: e.target.value }))
                }
                placeholder="Leave empty to hide the compensation callout"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={5}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="benefits">Benefits (comma-separated)</Label>
              <Textarea
                id="benefits"
                rows={3}
                value={form.benefitsStr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, benefitsStr: e.target.value }))
                }
                placeholder="Benefit one, Benefit two"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={form.tagsStr}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tagsStr: e.target.value }))
                }
                placeholder="Remote, Next.js, Internship"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort order (when editing)</Label>
              <Input
                id="sortOrder"
                type="number"
                placeholder="auto for new"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    sortOrder:
                      e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : form.id ? "Update" : "Add opening"}
            </Button>
            {form.id ? (
              <Button type="button" variant="outline" onClick={clearForm}>
                Cancel edit
              </Button>
            ) : null}
          </div>
        </form>
        {msg ? (
          <p className="mt-3 text-sm text-green-600 dark:text-green-400">
            {msg}
          </p>
        ) : null}
        {err ? (
          <p className="mt-3 text-sm text-destructive">{err}</p>
        ) : null}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">
          All openings ({jobs.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ul className="space-y-3">
            {jobs.map((j) => (
              <li
                key={j.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{j.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {j.type} · {j.experience}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => startEdit(j)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(j.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
