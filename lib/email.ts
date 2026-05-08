import nodemailer from 'nodemailer'

export interface EmailMessage {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(message: EmailMessage): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text || '',
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export function createContactEmailHTML(data: {
  name: string
  email: string
  phone: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nowa wiadomość z formularza kontaktowego</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.1);
        }
        .header {
          border-bottom: 2px solid #f0177a;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .title {
          color: #f0177a;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .field {
          margin-bottom: 20px;
        }
        .label {
          font-weight: 600;
          color: #666;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }
        .value {
          font-size: 16px;
          color: #333;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 6px;
          border-left: 4px solid #f0177a;
        }
        .message-content {
          white-space: pre-wrap;
          line-height: 1.8;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          font-size: 12px;
          color: #999;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">📬 Nowa wiadomość z formularza kontaktowego</h1>
        </div>
        
        <div class="field">
          <div class="label">Imię i nazwisko</div>
          <div class="value">${data.name}</div>
        </div>
        
        <div class="field">
          <div class="label">Adres email</div>
          <div class="value">${data.email}</div>
        </div>
        
        <div class="field">
          <div class="label">Numer telefonu</div>
          <div class="value">${data.phone || 'Nie podano'}</div>
        </div>
        
        <div class="field">
          <div class="label">Wiadomość</div>
          <div class="value message-content">${data.message}</div>
        </div>
        
        <div class="footer">
          <p>Wiadomość wysłana ze strony eventowej - ${new Date().toLocaleString('pl-PL')}</p>
        </div>
      </div>
    </body>
    </html>
  `
}
