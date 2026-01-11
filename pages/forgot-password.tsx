import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, ArrowLeft, KeyRound, CheckCircle } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) {
      setError('')
    }
  }

  if (submitted) {
    return (
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <Link href="/" className={styles.navBrand}>
            <Image
              src="/ak-evlilik-logo.svg"
              alt="AK Evlilik"
              width={180}
              height={60}
              priority
            />
          </Link>
        </nav>

        <main className={styles.main}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <div className={styles.iconCircle} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <CheckCircle size={32} />
              </div>
              <h1>Check Your Email</h1>
              <p className={styles.successMessage}>
                We&apos;ve sent password reset instructions to:
              </p>
              <p className={styles.emailDisplay}>{email}</p>
            </div>

            <div className={styles.instructionsBox}>
              <h3>What&apos;s next?</h3>
              <ol>
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the password reset link in the email</li>
                <li>Create a new password</li>
                <li>Sign in with your new password</li>
              </ol>
            </div>

            <div className={styles.authFooter}>
              <p>Didn&apos;t receive the email?</p>
              <button
                onClick={() => setSubmitted(false)}
                className={styles.switchLink}
              >
                Try again
              </button>
            </div>

            <Link href="/login" className={styles.backLink}>
              <ArrowLeft size={18} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <Image
            src="/ak-evlilik-logo.svg"
            alt="AK Evlilik"
            width={180}
            height={60}
            priority
          />
        </Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <div className={styles.iconCircle}>
              <KeyRound size={32} />
            </div>
            <h1>Forgot Password?</h1>
            <p>No worries! Enter your email and we&apos;ll send you reset instructions</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email">
                <Mail size={18} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={error ? styles.inputError : ''}
                autoFocus
              />
              {error && (
                <span className={styles.errorText}>{error}</span>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              <Mail size={20} />
              <span>Send Reset Link</span>
            </button>
          </form>

          <Link href="/login" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
