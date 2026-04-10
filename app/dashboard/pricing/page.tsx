"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { PricingPlanWithId } from "@/types/pricing";

const empty = {
  id: null as string | null,
  tier: 1,
  name: "",
  nameSecondary: "",
  tagline: "",
  priceDisplay: "",
  description: "",
  featuresStr: "",
  ctaLabel: "Get a Quote",
  ctaUrl: "/",
  highlighted: false,
  sortOrder: 0 as number | "",
};

export default function DashboardPricingPage() {
  const [plans, setPlans] = useState<PricingPlanWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const r = await fetch("/api/v1/pricing");
    if (!r.ok) {
      setErr("Could not load pricing.");
      setLoading(false);
      return;
    }
    const data = (await r.json()) as PricingPlanWithId[];
    setPlans(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(p: PricingPlanWithId) {
    setForm({
      id: p.id,
      tier: p.tier,
      name: p.name,
      nameSecondary: p.nameSecondary ?? "",
      tagline: p.tagline,
      priceDisplay: p.priceDisplay,
      description: p.description,
      featuresStr: p.features.join(", "),
      ctaLabel: p.ctaLabel,
      ctaUrl: p.ctaUrl,
      highlighted: p.highlighted,
      sortOrder: p.sortOrder,
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
      const features = form.featuresStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const sortOrderNum =
        form.sortOrder === "" ? undefined : Number(form.sortOrder);
      const payload = {
        tier: Number(form.tier),
        name: form.name,
        nameSecondary: form.nameSecondary,
        tagline: form.tagline,
        priceDisplay: form.priceDisplay,
        description: form.description,
        features,
        ctaLabel: form.ctaLabel,
        ctaUrl: form.ctaUrl,
        highlighted: form.highlighted,
        ...(form.id && sortOrderNum !== undefined && Number.isFinite(sortOrderNum)
          ? { sortOrder: sortOrderNum }
          : {}),
      };

      if (form.id) {
        const r = await fetch(`/api/v1/admin/pricing/${form.id}`, {
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
        setMsg("Plan updated.");
      } else {
        const r = await fetch("/api/v1/admin/pricing", {
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
        setMsg("Plan added.");
      }
      clearForm();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this pricing plan?")) return;
    setErr(null);
    const r = await fetch(`/api/v1/admin/pricing/${id}`, { method: "DELETE" });
    if (!r.ok) {
      setErr("Delete failed.");
      return;
    }
    if (form.id === id) clearForm();
    setMsg("Plan deleted.");
    await load();
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">
          {form.id ? "Edit plan" : "Add plan"}
        </h2>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tier">Tier (1–3)</Label>
            <Input
              id="tier"
              type="number"
              min={1}
              max={99}
              value={form.tier}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  tier: Number(e.target.value) || 1,
                }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort order (edit only)</Label>
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
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Package name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="nameSecondary">
              Alternate name (example: Velocity AI, shown as “or …”)
            </Label>
            <Input
              id="nameSecondary"
              value={form.nameSecondary}
              onChange={(e) =>
                setForm((f) => ({ ...f, nameSecondary: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={form.tagline}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagline: e.target.value }))
              }
              placeholder="The Pilot"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceDisplay">Price label</Label>
            <Input
              id="priceDisplay"
              value={form.priceDisplay}
              onChange={(e) =>
                setForm((f) => ({ ...f, priceDisplay: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
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
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              value={form.featuresStr}
              onChange={(e) =>
                setForm((f) => ({ ...f, featuresStr: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaLabel">CTA label</Label>
            <Input
              id="ctaLabel"
              value={form.ctaLabel}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaLabel: e.target.value }))
              }
              placeholder="Get a Quote"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ctaUrl">CTA URL</Label>
            <Input
              id="ctaUrl"
              value={form.ctaUrl}
              onChange={(e) =>
                setForm((f) => ({ ...f, ctaUrl: e.target.value }))
              }
              placeholder="#book-call or https://…"
            />
            <p className="text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1">/#contact</code>
            </p>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="highlighted"
              type="checkbox"
              className="size-4 rounded border-input accent-violet-600"
              checked={form.highlighted}
              onChange={(e) =>
                setForm((f) => ({ ...f, highlighted: e.target.checked }))
              }
            />
            <Label htmlFor="highlighted" className="cursor-pointer font-normal">
              Highlight as “Most popular”
            </Label>
          </div>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : form.id ? "Update" : "Add plan"}
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
          All plans ({plans.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : (
          <ul className="space-y-3">
            {plans.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    Tier {p.tier}: {p.name}
                    {p.nameSecondary ? ` / ${p.nameSecondary}` : ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {p.tagline}
                    {p.highlighted ? " · Most popular" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => remove(p.id)}
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
