import { Suspense } from "react";
import { AuthRouteDarkTheme } from "@/components/auth/auth-route-dark-theme";
import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";
import { ResetPasswordForm } from "./reset-password-form";

type PageProps = {
  searchParams?: Promise<{ token?: string | string[] }>;
};

function pickToken(v: string | string[] | undefined): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? "";
  return "";
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const initialToken = pickToken(sp.token);

  return (
    <AuthRouteDarkTheme>
      <Suspense
        fallback={
          <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 pt-24 text-muted-foreground sm:pt-32">
            <CareersStyleAuthBackground />
            <span className="relative z-10">Loading…</span>
          </div>
        }
      >
        <ResetPasswordForm initialToken={initialToken} />
      </Suspense>
    </AuthRouteDarkTheme>
  );
}
