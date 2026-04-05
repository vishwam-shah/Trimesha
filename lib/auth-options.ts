import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connect } from "@/dbconfig/dbconnect";
import User from "@/models/User";
import type { UserRole } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connect();

        const user = await User.findOne({
          email: credentials.email.toLowerCase().trim(),
        }).lean();

        if (!user) {
          return null;
        }

        const ok = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!ok) {
          return null;
        }

        let role: UserRole = "user";
        if (user.role === "superadmin") role = "superadmin";
        else if (user.role === "admin") role = "admin";

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name ?? undefined,
          role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: UserRole }).role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) ?? "";
        session.user.role = (token.role as UserRole) ?? "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
