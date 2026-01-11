import nodemailer from 'nodemailer'

const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com'
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587')
const EMAIL_USER = process.env.EMAIL_USER || ''
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || ''
const EMAIL_FROM = process.env.EMAIL_FROM || 'Blog Sermaye <noreply@blogsermaye.com>'
const APP_URL = process.env.APP_URL || 'http://localhost:3000'

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

/**
 * Send email verification email
 */
export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string
): Promise<boolean> {
  const verificationUrl = `${APP_URL}/verify-email?token=${token}`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0070f3 0%, #00a8ff 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #0070f3 0%, #00a8ff 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to Blog Sermaye! 💝</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>Thank you for signing up! We're excited to have you join our community.</p>
          <p>To complete your registration and verify your email address, please click the button below:</p>
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify Email Address</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0070f3;">${verificationUrl}</p>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you didn't create an account with Blog Sermaye, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Blog Sermaye. All rights reserved.</p>
        </div>
      </body>
    </html>
  `

  const text = `
    Welcome to Blog Sermaye!

    Hi ${name},

    Thank you for signing up! To complete your registration and verify your email address, please visit:

    ${verificationUrl}

    This link will expire in 24 hours.

    If you didn't create an account with Blog Sermaye, you can safely ignore this email.

    - Blog Sermaye Team
  `

  return sendEmail({
    to: email,
    subject: 'Verify Your Email - Blog Sermaye',
    html,
    text,
  })
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  name: string,
  token: string
): Promise<boolean> {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #0070f3 0%, #00a8ff 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #0070f3 0%, #00a8ff 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .warning {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>We received a request to reset your password for your Blog Sermaye account.</p>
          <p>Click the button below to create a new password:</p>
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #0070f3;">${resetUrl}</p>
          <div class="warning">
            <strong>⚠️ Security Notice:</strong>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request this, please ignore this email</li>
              <li>Your password will remain unchanged until you create a new one</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <p>&copy; 2026 Blog Sermaye. All rights reserved.</p>
        </div>
      </body>
    </html>
  `

  const text = `
    Password Reset Request

    Hi ${name},

    We received a request to reset your password for your Blog Sermaye account.

    To reset your password, please visit:

    ${resetUrl}

    This link will expire in 1 hour.

    If you didn't request this, please ignore this email. Your password will remain unchanged.

    - Blog Sermaye Team
  `

  return sendEmail({
    to: email,
    subject: 'Reset Your Password - Blog Sermaye',
    html,
    text,
  })
}

/**
 * Send welcome email after verification
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #ff0844 0%, #ff5478 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #ff0844 0%, #ff5478 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
          .features {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .features ul {
            list-style: none;
            padding: 0;
          }
          .features li {
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .features li:last-child {
            border-bottom: none;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Welcome to Blog Sermaye!</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>Your email has been verified and your account is now active! 🎊</p>
          <p>You're all set to start connecting with amazing people.</p>

          <div class="features">
            <h3>What you can do now:</h3>
            <ul>
              <li>💖 Discover and match with people</li>
              <li>📹 Start video calls with your matches</li>
              <li>📡 Go live and broadcast to the community</li>
              <li>💬 Chat with your matches</li>
              <li>✨ Join "Go Live Together" sessions</li>
            </ul>
          </div>

          <div style="text-align: center;">
            <a href="${APP_URL}/discover" class="button">Start Discovering</a>
          </div>

          <p>Need help? Check out our <a href="${APP_URL}/help">Help Center</a> or reply to this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2026 Blog Sermaye. All rights reserved.</p>
        </div>
      </body>
    </html>
  `

  const text = `
    Welcome to Blog Sermaye!

    Hi ${name},

    Your email has been verified and your account is now active!

    What you can do now:
    - Discover and match with people
    - Start video calls with your matches
    - Go live and broadcast to the community
    - Chat with your matches
    - Join "Go Live Together" sessions

    Start discovering: ${APP_URL}/discover

    - Blog Sermaye Team
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to Blog Sermaye! 🎉',
    html,
    text,
  })
}
