import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Mail, Lock, User, UserPlus, LogIn, Calendar, CheckCircle } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    agreeToTerms: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      agreeToTerms: ''
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
      isValid = false
    }

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

    if (!formData.age) {
      newErrors.age = 'Age is required'
      isValid = false
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = 'You must be at least 18 years old'
      isValid = false
    } else if (parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age'
      isValid = false
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender'
      isValid = false
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          age: formData.age,
          gender: formData.gender,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setErrorMessage(data.message)
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    const checked = type === 'checkbox' ? target.checked : undefined

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
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
              <div className={styles.iconCircle} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                <CheckCircle size={32} />
              </div>
              <h1>Registration Successful!</h1>
              <p className={styles.successMessage}>
                Check your email to verify your account
              </p>
            </div>

            <div className={styles.instructionsBox}>
              <h3>What&apos;s next?</h3>
              <ol>
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the verification link in the email</li>
                <li>Your account will be activated</li>
                <li>Log in and start connecting!</li>
              </ol>
            </div>

            <div className={styles.authFooter}>
              <p>Already verified?</p>
              <Link href="/login" className={styles.switchLink}>
                <LogIn size={18} />
                <span>Sign In</span>
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
              <UserPlus size={32} />
            </div>
            <h1>Create Account</h1>
            <p>Join the community and start connecting</p>
          </div>

          {errorMessage && (
            <div style={{ background: '#fee', border: '1px solid #fcc', borderRadius: '8px', padding: '12px', marginBottom: '1rem', color: '#c33' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">
                <User size={18} />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">
                <Mail size={18} />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="age">
                  <Calendar size={18} />
                  <span>Age</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="18+"
                  className={errors.age ? styles.inputError : ''}
                  min="18"
                  max="120"
                />
                {errors.age && (
                  <span className={styles.errorText}>{errors.age}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="gender">
                  <User size={18} />
                  <span>Gender</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? styles.inputError : ''}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <span className={styles.errorText}>{errors.gender}</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">
                <Lock size={18} />
                <span>Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
                className={errors.password ? styles.inputError : ''}
              />
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">
                <Lock size={18} />
                <span>Confirm Password</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={errors.confirmPassword ? styles.inputError : ''}
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>{errors.confirmPassword}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className={styles.inlineLink}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className={styles.inlineLink}>
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <span className={styles.errorText}>{errors.agreeToTerms}</span>
              )}
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              <UserPlus size={20} />
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.authFooter}>
            <p>Already have an account?</p>
            <Link href="/login" className={styles.switchLink}>
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
