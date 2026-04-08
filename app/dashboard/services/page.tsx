"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceWithId } from "@/types/service";

const empty = {
  id: null as string | null,
  slug: "",
  title: "",
  description: "",
  image: "",
  color: "#1e3a5f",
  overview: "",
  deliverablesStr: "",
  goodForStr: "",
  typicalTimeline: "",
  sortOrder: "" as number | "",
};

export default function DashboardServicesPage() {
  const [services, setServices] = useState<ServiceWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/v1/services");
    if (!r.ok) {
      setErr("Could not load services.");
      setLoading(false);
      return;
    }
    const data = (await r.json()) as ServiceWithId[];
    setServices(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(s: ServiceWithId) {
    setForm({
      id: s.id,
      slug: s.slug,
      title: s.title,
      description: s.description,
      image: s.image,
      color: s.color,
      overview: s.overview,
      deliverablesStr: s.deliverables.join(", "),
      goodForStr: s.goodFor.join(", "),
      typicalTimeline: s.typicalTimeline,
      sortOrder: s.sortOrder,
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
      const deliverables = form.deliverablesStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const goodFor = form.goodForStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const sortOrderNum =
        form.sortOrder === "" ? undefined : Number(form.sortOrder);

      const payload = {
        slug: form.slug,
        title: form.title,
        description: form.description,
        image: form.image,
        color: form.color,
        overview: form.overview,
        deliverables,
        goodFor,
        typicalTimeline: form.typicalTimeline,
        ...(form.id && sortOrderNum !== undefined && Number.isFinite(sortOrderNum)
          ? { sortOrder: sortOrderNum }
          : {}),
      };

      if (form.id) {
        const r = await fetch(`/api/v1/admin/services/${form.id}`, {
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
        setMsg("Service updated.");
      } else {
        const r = await fetch("/api/v1/admin/services", {
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
        setMsg("Service added.");
      }
      clearForm();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    setErr(null);
    const r = await fetch(`/api/v1/admin/services/${id}`, { method: "DELETE" });
    if (!r.ok) {
      setErr("Delete failed.");
      return;
    }
    if (form.id === id) clearForm();
    setMsg("Service deleted.");
    await load();
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">
          {form.id ? "Edit service" : "Add service"}
        </h2>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="web-development"
              required
            />
            <p className="text-xs text-muted-foreground">
              Used internally to match the service. Keep it stable.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Accent color</Label>
            <Input
              id="color"
              value={form.color}
              onChange={(e) =>
                setForm((f) => ({ ...f, color: e.target.value }))
              }
              placeholder="#1e3a5f"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Card description</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="overview">Learn more overview</Label>
            <Textarea
              id="overview"
              rows={4}
              value={form.overview}
              onChange={(e) =>
                setForm((f) => ({ ...f, overview: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="deliverables">Deliverables (comma-separated)</Label>
            <Textarea
              id="deliverables"
              rows={3}
              value={form.deliverablesStr}
              onChange={(e) =>
                setForm((f) => ({ ...f, deliverablesStr: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="goodFor">Good for (comma-separated)</Label>
            <Textarea
              id="goodFor"
              rows={3}
              value={form.goodForStr}
              onChange={(e) =>
                setForm((f) => ({ ...f, goodForStr: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="typicalTimeline">Typical timeline</Label>
            <Input
              id="typicalTimeline"
              value={form.typicalTimeline}
              onChange={(e) =>
                setForm((f) => ({ ...f, typicalTimeline: e.target.value }))
              }
              placeholder="2 to 6 weeks depending on scope"
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
                  sortOrder: e.target.value === "" ? "" : Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : form.id ? "Update" : "Add service"}
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
        {err ? <p className="mt-3 text-sm text-destructive">{err}</p> : null}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">
          All services ({services.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ul className="space-y-3">
            {services.map((s) => (
              <li
                key={s.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => startEdit(s)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(s.id)}
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

