import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, CheckCircle, KeyRound } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

export default function ResetPassword() {
  const router = useRouter()
  const { token } = router.query
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!token && router.isReady) {
      router.push('/forgot-password')
    }
  }, [token, router])

  const validateForm = () => {
    const newErrors = { password: '', confirmPassword: '' }
    let isValid = true

    if (!formData.password) {
      newErrors.password = 'Password is required'
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setErrorMessage(data.message)
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  if (success) {
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
          <div className={`${styles.authCard} animate-scale-in`}>
            <div className={styles.authHeader}>
              <div
                className={styles.iconCircle}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                }}
              >
                <CheckCircle size={32} />
              </div>
              <h1>Password Reset Successful!</h1>
              <p className={styles.successMessage}>
                Your password has been successfully reset
              </p>
            </div>

            <div className={styles.instructionsBox}>
              <h3>What&apos;s next?</h3>
              <ul>
                <li>Your new password is now active</li>
                <li>You can log in with your new password</li>
                <li>Make sure to remember your new password</li>
              </ul>
            </div>

            <div className={styles.authFooter}>
              <p>Redirecting to login page in 3 seconds...</p>
              <Link href="/login" className={styles.switchLink}>
                Go to Login Now
              </Link>
            </div>
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
        <div className={`${styles.authCard} animate-scale-in`}>
          <div className={styles.authHeader}>
            <div className={styles.iconCircle}>
              <KeyRound size={32} />
            </div>
            <h1>Reset Your Password</h1>
            <p>Enter your new password below</p>
          </div>

          {errorMessage && (
            <div
              style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '1rem',
                color: '#c33',
              }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="password">
                <Lock size={18} />
                <span>New Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password (min 6 characters)"
                className={errors.password ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">
                <Lock size={18} />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className={errors.confirmPassword ? styles.inputError : ''}
                disabled={loading}
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              <KeyRound size={20} />
              <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
            </button>
          </form>

          <Link href="/login" className={styles.backLink}>
            Back to Login
          </Link>
        </div>
      </main>
    </div>
  )
}
