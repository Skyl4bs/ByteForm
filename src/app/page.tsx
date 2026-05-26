import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";
import { GuestHomePage } from "@/features/builder/components/GuestHomePage";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <GuestHomePage />;
}
