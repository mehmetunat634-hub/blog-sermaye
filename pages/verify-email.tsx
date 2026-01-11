import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2, Heart } from 'lucide-react'
import styles from '@/styles/Auth.module.css'

type VerificationState = 'loading' | 'success' | 'error'

export default function VerifyEmail() {
  const router = useRouter()
  const { token } = router.query
  const [state, setState] = useState<VerificationState>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) return

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (data.success) {
          setState('success')
          setMessage(data.message)
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login')
          }, 3000)
        } else {
          setState('error')
          setMessage(data.message)
        }
      } catch (error) {
        setState('error')
        setMessage('An error occurred during verification. Please try again.')
      }
    }

    verifyEmail()
  }, [token, router])

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <Heart size={24} fill="currentColor" />
          <h2>Blog Sermaye</h2>
        </Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.authCard}>
          {state === 'loading' && (
            <>
              <div className={styles.authHeader}>
                <div className={styles.iconCircle}>
                  <Loader2 size={32} className="animate-spin" />
                </div>
                <h1>Verifying Email...</h1>
                <p>Please wait while we verify your email address</p>
              </div>
            </>
          )}

          {state === 'success' && (
            <>
              <div className={styles.authHeader}>
                <div
                  className={styles.iconCircle}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  }}
                >
                  <CheckCircle size={32} />
                </div>
                <h1>Email Verified!</h1>
                <p className={styles.successMessage}>{message}</p>
              </div>

              <div className={styles.instructionsBox}>
                <h3>What&apos;s next?</h3>
                <ul>
                  <li>Your account is now fully activated</li>
                  <li>You can log in and start using all features</li>
                  <li>Discover and match with people</li>
                  <li>Start video calls and live streaming</li>
                </ul>
              </div>

              <div className={styles.authFooter}>
                <p>Redirecting to login page in 3 seconds...</p>
                <Link href="/login" className={styles.switchLink}>
                  Go to Login Now
                </Link>
              </div>
            </>
          )}

          {state === 'error' && (
            <>
              <div className={styles.authHeader}>
                <div
                  className={styles.iconCircle}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  }}
                >
                  <XCircle size={32} />
                </div>
                <h1>Verification Failed</h1>
                <p style={{ color: '#ef4444' }}>{message}</p>
              </div>

              <div className={styles.instructionsBox}>
                <h3>What can you do?</h3>
                <ul>
                  <li>Check if the link in your email is complete</li>
                  <li>Request a new verification email</li>
                  <li>Contact support if the problem persists</li>
                </ul>
              </div>

              <div className={styles.authFooter}>
                <Link href="/login" className={styles.switchLink}>
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
