import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { generateRandomToken, createTokenExpiry } from '@/lib/auth'
import { sendPasswordResetEmail } from '@/lib/email'

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
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      })
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return success to prevent email enumeration
    // Even if user doesn't exist, we return success
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, you will receive password reset instructions.',
      })
    }

    // Generate reset token
    const resetToken = generateRandomToken()
    const resetTokenExpiry = createTokenExpiry(1) // 1 hour

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(
      user.email,
      user.name,
      resetToken
    )

    if (!emailSent) {
      console.error('Failed to send password reset email to:', user.email)
    }

    return res.status(200).json({
      success: true,
      message: 'If an account exists with this email, you will receive password reset instructions.',
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.',
    })
  }
}
