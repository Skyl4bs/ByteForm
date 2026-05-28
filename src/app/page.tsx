import { createClient } from "@/shared/lib/supabase/server";
import { redirect } from "next/navigation";
import { GuestHomePage } from "@/features/builder/components/GuestHomePage";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const posts = getAllPosts().slice(0, 3);

  return <GuestHomePage posts={posts} />;
}
