import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { promises as fs } from "fs";
import path from "path";

interface SubscribeBody {
  email?: string;
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function appendEmail(email: string): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "emails.json");
  await fs.mkdir(dataDir, { recursive: true });
  let list: string[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf8");
    list = JSON.parse(raw);
  } catch {}
  if (!list.includes(email)) list.push(email);
  await fs.writeFile(filePath, JSON.stringify(list, null, 2), "utf8");
}

async function notify(email: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.ALERT_EMAIL ?? "popsabey.ux@gmail.com";
  if (!resendKey) return;
  const resend = new Resend(resendKey);
  await resend.emails.send({
    from: "SmartA <no-reply@smart-a.ai>",
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

    await appendEmail(email);
    await notify(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
