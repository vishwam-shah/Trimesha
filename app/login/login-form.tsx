"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { LogIn } from "lucide-react";
import { Header } from "@/components/layout/header";
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

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      router.refresh();
      const session = await getSession();
      const callback = searchParams.get("callbackUrl");
      const safeCallback =
        callback?.startsWith("/") && !callback.startsWith("//")
          ? callback
          : null;
      const next =
        session?.user?.role === "superadmin"
          ? "/dashboard"
          : safeCallback ?? "/";
      router.push(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-background px-4 pb-20 pt-24 text-foreground sm:min-h-[calc(100vh-6rem)] sm:pt-32">
        <CareersStyleAuthBackground />
        <div className="relative z-10 mx-auto w-full max-w-md">
          <Card className="border-border/80 shadow-xl shadow-black/5 ring-1 ring-black/[0.03] dark:shadow-black/20 dark:ring-white/[0.06]">
            <CardHeader className="space-y-3 pb-2 text-center sm:text-left">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary sm:mx-0">
                <LogIn className="size-6" aria-hidden />
              </div>
              <div className="space-y-1.5">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Sign in
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Welcome back. Enter your account details.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-2 pt-2 sm:px-8">
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
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 px-6 pb-8 pt-2 sm:px-8">
              <Separator className="bg-border/60" />
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-secondary underline-offset-4 hover:underline"
                >
                  Sign up
                </Link>
              </p>
              <p className="text-center text-sm">
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  ← Back to home
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
