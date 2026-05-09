"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
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

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      setSuccess(
        data.message ??
          "If an account exists for that email, we sent password reset instructions.",
      );
      setEmail("");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
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
              <KeyRound className="size-6" aria-hidden />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Forgot password
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Enter your email and we will send you a link to reset your password.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-2 pt-2 sm:px-8">
            {success ? (
              <p
                className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200"
                role="status"
              >
                {success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
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
                  {loading ? "Sending…" : "Send reset link"}
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
