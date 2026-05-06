import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { AppShell } from "@/components/layout/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = session.user as {
    name?: string | null;
    currentLevel?: string;
    streak?: number;
  };

  return (
    <AppShell
      header={
        <Header
          userName={user.name ?? "Öğrenci"}
          userLevel={(user.currentLevel as string) ?? "A1"}
          streak={(user.streak as number) ?? 0}
        />
      }
    >
      {children}
    </AppShell>
  );
}
