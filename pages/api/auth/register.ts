import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateRandomToken, createTokenExpiry } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'

type ResponseData = {
  success: boolean
  message: string
  userId?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const { name, email, password, age, gender } = req.body

    // Validate input
    if (!name || !email || !password || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      })
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      })
    }

    // Validate age
    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
      return res.status(400).json({
        success: false,
        message: 'You must be at least 18 years old',
      })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate verification token
    const verificationToken = generateRandomToken()
    const verificationExpiry = createTokenExpiry(24) // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        age: ageNum,
        gender: gender.toLowerCase(),
        verificationToken,
        verificationExpiry,
      },
    })

    // Send verification email
    const emailSent = await sendVerificationEmail(
      user.email,
      user.name,
      verificationToken
    )

    if (!emailSent) {
      console.error('Failed to send verification email to:', user.email)
      // Don't fail the registration, but log the error
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
      userId: user.id,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again.',
    })
  }
}
