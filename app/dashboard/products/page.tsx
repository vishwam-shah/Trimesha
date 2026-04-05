"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProductSlideWithId } from "@/types/product"

const empty = {
  id: null as string | null,
  place: "",
  title: "",
  title2: "",
  description: "",
  image: "",
  url: "",
  category: "",
  featuresStr: "",
}

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<ProductSlideWithId[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  async function load() {
    const r = await fetch("/api/products")
    if (!r.ok) {
      setErr("Could not load products.")
      setLoading(false)
      return
    }
    const data = (await r.json()) as ProductSlideWithId[]
    setProducts(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(p: ProductSlideWithId) {
    setForm({
      id: p.id,
      place: p.place,
      title: p.title,
      title2: p.title2,
      description: p.description,
      image: p.image,
      url: p.url,
      category: p.category,
      featuresStr: p.features.join(", "),
    })
    setMsg(null)
    setErr(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function clearForm() {
    setForm(empty)
    setMsg(null)
    setErr(null)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setMsg(null)
    setSaving(true)
    try {
      const features = form.featuresStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
      const payload = {
        place: form.place,
        title: form.title,
        title2: form.title2,
        description: form.description,
        image: form.image,
        url: form.url,
        category: form.category,
        features,
      }

      if (form.id) {
        const r = await fetch(`/api/admin/products/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!r.ok) {
          const j = await r.json().catch(() => ({}))
          setErr(typeof j.error === "string" ? j.error : "Update failed")
          setSaving(false)
          return
        }
        setMsg("Product updated.")
      } else {
        const r = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!r.ok) {
          const j = await r.json().catch(() => ({}))
          setErr(typeof j.error === "string" ? j.error : "Create failed")
          setSaving(false)
          return
        }
        setMsg("Product added.")
      }
      clearForm()
      await load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return
    setErr(null)
    const r = await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
    if (!r.ok) {
      setErr("Delete failed.")
      return
    }
    if (form.id === id) clearForm()
    setMsg("Product deleted.")
    await load()
  }

  return (
    <div className="space-y-10">
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">
          {form.id ? "Edit product" : "Add product"}
        </h2>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="place">Place / label</Label>
            <Input
              id="place"
              value={form.place}
              onChange={(e) =>
                setForm((f) => ({ ...f, place: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title line 1</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title2">Title line 2</Label>
            <Input
              id="title2"
              value={form.title2}
              onChange={(e) =>
                setForm((f) => ({ ...f, title2: e.target.value }))
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
          <div className="space-y-2">
            <Label htmlFor="image">Image URL / path</Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              placeholder="/products/product1.jpg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Product link</Label>
            <Input
              id="url"
              value={form.url}
              onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
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
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : form.id ? "Update" : "Add product"}
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
          All products ({products.length})
        </h2>
        {loading ? (
          <p className="text-muted-foreground">Loading list…</p>
        ) : (
          <ul className="space-y-3">
            {products.map((p) => (
              <li
                key={p.id}
                className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">
                    {p.title} {p.title2}
                  </p>
                  <p className="text-sm text-muted-foreground">{p.place}</p>
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
  )
}
