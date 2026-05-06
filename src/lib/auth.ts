import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      currentLevel: string;
      streak: number;
      totalXP: number;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "student";
        token.currentLevel = (user as { currentLevel?: string }).currentLevel ?? "A1";
        token.streak = (user as { streak?: number }).streak ?? 0;
        token.totalXP = (user as { totalXP?: number }).totalXP ?? 0;
      }
      if (trigger === "update" && token.id) {
        const fresh = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { streak: true, totalXP: true, currentLevel: true },
        });
        if (fresh) {
          token.streak = fresh.streak;
          token.totalXP = fresh.totalXP;
          token.currentLevel = fresh.currentLevel;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.currentLevel = token.currentLevel as string;
        session.user.streak = token.streak as number;
        session.user.totalXP = token.totalXP as number;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user) return null;

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          currentLevel: user.currentLevel,
          streak: user.streak,
          totalXP: user.totalXP,
        };
      },
    }),
  ],
});
