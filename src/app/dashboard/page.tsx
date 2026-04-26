import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/features/dashboard/components/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: forms } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const formIds = (forms ?? []).map((f) => f.id);
  const responseCounts: Record<string, number> = {};
  if (formIds.length > 0) {
    const { data: subs } = await supabase
      .from("submissions")
      .select("form_id")
      .in("form_id", formIds);
    if (subs) {
      for (const s of subs) {
        responseCounts[s.form_id] = (responseCounts[s.form_id] ?? 0) + 1;
      }
    }
  }

  return (
    <DashboardClient
      forms={forms ?? []}
      responseCounts={responseCounts}
    />
  );
}
