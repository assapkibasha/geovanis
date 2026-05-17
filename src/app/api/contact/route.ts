import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";

const hits = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const current = hits.get(ip);
  if (current && current.resetAt > now && current.count > 8) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  hits.set(ip, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: now + 60_000,
  });

  const payload = contactSchema.parse(await request.json());
  return NextResponse.json({ ok: true, message: "Contact request received", payload });
}
