// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { UserPlus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { AuthRouteDarkTheme } from "@/components/auth/auth-route-dark-theme";
// import { CareersStyleAuthBackground } from "@/components/auth/careers-style-auth-background";

// export default function SignupPage() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       const res = await fetch("/api/v1/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: name.trim(),
//           email: email.trim(),
//           password,
//         }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) {
//         setError(
//           typeof data.error === "string"
//             ? data.error
//             : "Could not create account.",
//         );
//         setLoading(false);
//         return;
//       }
//       router.push("/login?registered=1");
//       router.refresh();
//     } catch {
//       setError("Network error. Please try again.");
//       setLoading(false);
//     }
//   }

//   return (
//     <AuthRouteDarkTheme>
//     <main className="relative min-h-screen overflow-hidden bg-background px-4 pb-20 pt-24 text-foreground sm:pt-32">
//         <CareersStyleAuthBackground />
//         <div className="relative z-10 mx-auto w-full max-w-md">
//           <Card className="border-border/80 shadow-xl shadow-black/5 ring-1 ring-black/[0.03] dark:shadow-black/20 dark:ring-white/[0.06]">
//             <CardHeader className="space-y-3 pb-2 text-center sm:text-left">
//               <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary sm:mx-0">
//                 <UserPlus className="size-6" aria-hidden />
//               </div>
//               <div className="space-y-1.5">
//                 <CardTitle className="text-2xl font-semibold tracking-tight">
//                   Create account
//                 </CardTitle>
//                 <CardDescription className="text-base leading-relaxed">
//                   Sign up to save your preferences across devices.
//                 </CardDescription>
//               </div>
//             </CardHeader>
//             <CardContent className="px-6 pb-2 pt-2 sm:px-8">
//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     required
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Your name"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="you@company.com"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="new-password"
//                     required
//                     minLength={8}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                   />
//                   <p className="text-xs text-muted-foreground">
//                     At least 8 characters.
//                   </p>
//                 </div>

//                 {error ? (
//                   <p
//                     className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
//                     role="alert"
//                   >
//                     {error}
//                   </p>
//                 ) : null}

//                 <Button type="submit" className="w-full" size="lg" disabled={loading}>
//                   {loading ? "Creating account…" : "Sign up"}
//                 </Button>
//               </form>
//             </CardContent>
//             <CardFooter className="flex flex-col gap-4 px-6 pb-8 pt-2 sm:px-8">
//               <Separator className="bg-border/60" />
//               <p className="text-center text-sm text-muted-foreground">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="font-medium text-secondary underline-offset-4 hover:underline"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//               <p className="text-center text-sm">
//                 <Link
//                   href="/"
//                   className="text-muted-foreground transition-colors hover:text-foreground"
//                 >
//                   ← Back to home
//                 </Link>
//               </p>
//             </CardFooter>
//           </Card>
//         </div>
//     </main>
//     </AuthRouteDarkTheme>
//   );
// }
export default function signup(){
  return(
    <div className="bg-black min-h-screen">

    </div>
  )
}