import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
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

  const { error } = await resend.emails.send({
    from: 'Formularz spawarkilaserowe.com <onboarding@resend.dev>',
    to: ['kontakt@spawarkilaserowe.com'],
    replyTo: email || undefined,
    subject: `Zapytanie od ${name}${company ? ` (${company})` : ''}`,
    text: lines,
    html: `<pre style="font-family:sans-serif;font-size:14px;line-height:1.6">${lines.replace(/\n/g, '<br>')}</pre>`,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Błąd wysyłki. Spróbuj ponownie.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
