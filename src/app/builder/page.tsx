import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";

// /builder (no ID) — redirect logged-in users to dashboard to create a new form,
// or redirect guests to the homepage builder.
export default async function BuilderIndexPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  redirect("/");
}
