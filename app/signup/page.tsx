import Link from "next/link";
import { AuthRouteDarkTheme } from "@/components/auth/auth-route-dark-theme";
import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <AuthRouteDarkTheme>
      <main className="relative min-h-screen overflow-x-hidden bg-background px-4 pb-16 pt-24 text-foreground sm:pb-20 sm:pt-32">
        <CareersStyleAuthBackground />
        <div className="relative z-10 mx-auto w-full max-w-md text-center sm:text-left">
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Public sign up is not available
          </h1>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Access to Trimesha accounts is by invitation. If your team uses the
            admin dashboard, sign in with the credentials you were given.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </div>
      </main>
    </AuthRouteDarkTheme>
  );
}
