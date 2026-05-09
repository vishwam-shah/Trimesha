"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";

export function ResetPasswordForm({
  initialToken = "",
}: {
  initialToken?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  /** Raw token from server or client URL (API normalizes again). */
  const rawToken = useMemo(() => {
    const q = searchParams.get("token")?.trim() ?? "";
    return (initialToken.trim() || q).trim();
  }, [initialToken, searchParams]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!rawToken) {
      setError("This page needs a valid link from your email.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: rawToken, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not reset password.");
        setLoading(false);
        return;
      }
      router.push("/login?reset=1");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 pb-20 pt-24 text-foreground sm:pt-32">
      <CareersStyleAuthBackground />
      <div className="relative z-10 mx-auto w-full max-w-md">
        <Card className="border-border/80 shadow-xl shadow-black/5 ring-1 ring-black/[0.03] dark:shadow-black/20 dark:ring-white/[0.06]">
          <CardHeader className="space-y-3 pb-2 text-center sm:text-left">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary sm:mx-0">
              <Lock className="size-6" aria-hidden />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Set a new password
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Choose a new password for your account. Links expire after one hour.
                If you requested reset more than once, use the link from the newest
                email only.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-2 pt-2 sm:px-8">
            {!rawToken ? (
              <div className="space-y-4">
                <p
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
                  This reset link is missing or invalid. Request a new link from the
                  forgot password page.
                </p>
                <Button asChild className="w-full" size="lg">
                  <Link href="/forgot-password">Request reset link</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">New password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm password</Label>
                  <Input
                    id="confirm"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat password"
                  />
                </div>

                {error ? (
                  <p
                    className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Updating…" : "Update password"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-6 pb-8 pt-2 sm:px-8">
            <Separator className="bg-border/60" />
            <p className="text-center text-sm">
              <Link
                href="/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
