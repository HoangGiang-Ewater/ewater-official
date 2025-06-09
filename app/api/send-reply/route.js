import "dotenv/config";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import ReplyTemplate from "@/app/_components/mails/ReplyTemplate";

console.log(
  "NEXT_PUBLIC_RESEND_API_KEY: ",
  process.env.NEXT_PUBLIC_RESEND_API_KEY
);
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
  const { to, subject, message, name } = await req.json();

  try {
    if (!resend) throw new Error("Resend client is not initialized");

    await resend.emails.send({
      from: "Your Name <hohoanggiang80@gmail.com>",
      to,
      subject,
      react: ReplyTemplate({ name, message }),
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
