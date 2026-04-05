import { Suspense } from "react";
import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-background px-4 pt-24 text-muted-foreground sm:pt-32">
          <CareersStyleAuthBackground />
          <span className="relative z-10">Loading…</span>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
