import { Resend } from "resend";
import ReplyTemplate from "@/app/_components/mails/ReplyTemplate";

/**
 * @function sendMail
 * @description Sends an email using the provided parameters.
 * @param {Object} params - The parameters for sending the email.
 * * @param {string} params.to - The recipient's email address.
 * * @param {string} params.subject - The subject of the email.
 * * @param {string} params.react - The React component to render in the email body.
 * @return {Promise<Object>} - A promise that resolves to the response data from the email service.
 * @throws {Error} - Throws an error if the email sending fails.
 */

export async function sendMail(data) {
  const res = await fetch("/api/send-reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: data.email,
      subject: data.subject,
      message: data.reply,
      name: data.name || "User",
    }),
  });

  if (!res.ok) throw new Error("Failed to send email");

  const responseData = await res.json();
  return {
    success: true,
    message: "Email sent successfully",
    data: responseData,
  };
}
