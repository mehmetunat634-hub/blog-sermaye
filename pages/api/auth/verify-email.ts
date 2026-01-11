import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { isTokenExpired } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

type ResponseData = {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const { token } = req.body

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required',
      })
    }

    // Find user with this verification token
    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token',
      })
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified',
      })
    }

    // Check if token is expired
    if (isTokenExpired(user.verificationExpiry)) {
      return res.status(400).json({
        success: false,
        message: 'Verification token has expired. Please request a new one.',
      })
    }

    // Update user - mark as verified and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationExpiry: null,
      },
    })

    // Send welcome email
    await sendWelcomeEmail(user.email, user.name)

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully! You can now log in.',
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return res.status(500).json({
      success: false,
      message: 'An error occurred during verification. Please try again.',
    })
  }
}
