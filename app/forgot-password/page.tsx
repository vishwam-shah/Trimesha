import { Suspense } from "react";
import { AuthRouteDarkTheme } from "@/components/auth/auth-route-dark-theme";
import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
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
        <ForgotPasswordForm />
      </Suspense>
    </AuthRouteDarkTheme>
  );
}
