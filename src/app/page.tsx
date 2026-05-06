import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootPage() {
  const cookieStore = await cookies();
  const hasSession =
    cookieStore.has("authjs.session-token") ||
    cookieStore.has("__Secure-authjs.session-token");

  if (hasSession) {
    redirect("/dashboard");
  }
  redirect("/landing");
}
