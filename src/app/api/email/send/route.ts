import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const from = process.env.RESEND_API_FROM;
  const to = process.env.RESEND_API_TO;

  if (!from || !to) {
    return new Response(
      JSON.stringify({ success: false, error: "Missing RESEND_API_FROM or RESEND_API_TO environment variable." }),
      { status: 500 }
    );
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      html: `
        <strong>Nombre:</strong> ${name}<br />
        <strong>Email:</strong> ${email}<br />
        <strong>Mensaje:</strong><br />
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500 }
    );
  }
}
