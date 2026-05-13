import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, company, phone, email, message } = body

  if (!name || !message) {
    return NextResponse.json({ error: 'Brakuje wymaganych pól.' }, { status: 400 })
  }

  const lines = [
    `Imię i nazwisko: ${name}`,
    company ? `Firma: ${company}` : null,
    phone ? `Telefon: ${phone}` : null,
    email ? `E-mail: ${email}` : null,
    ``,
    `Wiadomość:`,
    message,
  ]
    .filter((l) => l !== null)
    .join('\n')

  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `Formularz spawarkilaserowe.com <${process.env.SMTP_USER}>`,
      to: 'blink@blinklaser.com',
      replyTo: email || undefined,
      subject: `Zapytanie od ${name}${company ? ` (${company})` : ''}`,
      text: lines,
      html: `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6">${lines.replace(/\n/g, '<br>')}</pre>`,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return NextResponse.json({ error: 'Błąd wysyłki. Spróbuj ponownie.' }, { status: 500 })
  }
}
