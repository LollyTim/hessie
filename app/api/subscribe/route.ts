import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { api } from "@/convex/_generated/api";
import { internal } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

interface SubscribeBody {
  email?: string;
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function saveEmailConvex(email: string): Promise<void> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("Convex URL missing");
  const client = new ConvexHttpClient(url);
  await client.mutation(api.emails.add, { email });
}

async function notify(email: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.ALERT_EMAIL ?? "popsabey.ux@gmail.com";
  if (!resendKey) return;
  const resend = new Resend(resendKey);
  const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";
  await resend.emails.send({
    from: fromAddress,
    to: toAddress,
    subject: "New waitlist signup",
    text: `New email: ${email}`,
  });
}

export async function POST(req: NextRequest) {
  try {
    let email = "";
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as SubscribeBody;
      email = (body.email ?? "").trim();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") ?? "").trim();
    } else {
      const form = await req.formData();
      email = String(form.get("email") ?? "").trim();
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await saveEmailConvex(email);
    await notify(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
