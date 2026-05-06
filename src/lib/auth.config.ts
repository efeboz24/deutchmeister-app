import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "student";
        token.currentLevel = (user as { currentLevel?: string }).currentLevel ?? "A1";
        token.streak = (user as { streak?: number }).streak ?? 0;
        token.totalXP = (user as { totalXP?: number }).totalXP ?? 0;
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
  providers: [],
};
