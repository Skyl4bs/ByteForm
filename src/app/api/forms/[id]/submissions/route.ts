import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify form ownership
  const { data: form } = await supabase
    .from("forms")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!form) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data: submissions, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("form_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(submissions);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("submissions")
    .insert({
      form_id: id,
      answers: body.answers || {},
      started_at: body.startedAt || new Date().toISOString(),
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
