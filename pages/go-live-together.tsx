import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Radio, AlertTriangle } from 'lucide-react'
import styles from '@/styles/GoLiveTogether.module.css'

export default function GoLiveTogether() {
  const router = useRouter()
  const [gender, setGender] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [hasAgreed, setHasAgreed] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleStartMatching = () => {
    if (!gender || !lookingFor) {
      alert('Please select your gender and who you want to match with')
      return
    }

    if (!hasAgreed) {
      alert('Please agree to the terms to continue')
      return
    }

    setIsSearching(true)

    // Simulate finding a match
    setTimeout(() => {
      router.push('/live-together-matching')
    }, 3000)
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.navBrand}>
          <Image
            src="/ak-evlilik-logo.svg"
            alt="AK Evlilik"
            width={150}
            height={50}
            priority
          />
        </Link>
        <h2>Go Live Together</h2>
      </nav>

      <main className={styles.main}>
        <div className={styles.setupCard}>
          <div className={styles.header}>
            <h1><Radio size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} /> Go Live Together & Match</h1>
            <p className={styles.subtitle}>
              Get matched with a random person and go live together publicly
            </p>
          </div>

          <div className={styles.warningBox}>
            <h3><AlertTriangle size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} /> Important - Read Before Continuing</h3>
            <ul>
              <li>Your conversation will be <strong>broadcast publicly</strong> to all users</li>
              <li>Anyone on the platform can watch and interact</li>
              <li>Your video call will be <strong>live streamed in real-time</strong></li>
              <li>You&apos;ll be matched with a random person who also chose this option</li>
              <li>Both of you must agree to go live together</li>
              <li>The stream is live only - not recorded</li>
              <li>Follow community guidelines and be respectful</li>
            </ul>
          </div>

          {!isSearching ? (
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleStartMatching(); }}>
              <div className={styles.formGroup}>
                <label>Your Gender *</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Match Me With *</label>
                <select value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} required>
                  <option value="">Select preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Anyone</option>
                </select>
              </div>

              <div className={styles.consentSection}>
                <div className={styles.consentBox}>
                  <h4>Consent Agreement</h4>
                  <p>By checking this box, I confirm that:</p>
                  <ul>
                    <li>I am at least 18 years old</li>
                    <li>I understand this will be a <strong>public live stream</strong></li>
                    <li>I consent to being broadcast live to all platform users</li>
                    <li>I will follow all community guidelines</li>
                    <li>I can end the stream at any time</li>
                  </ul>

                  <label className={styles.consentCheckbox}>
                    <input
                      type="checkbox"
                      checked={hasAgreed}
                      onChange={(e) => setHasAgreed(e.target.checked)}
                      required
                    />
                    <span>
                      I have read and agree to these terms. I understand this will be a public broadcast.
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={!gender || !lookingFor || !hasAgreed}
                className={styles.startBtn}
              >
                <Radio size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Start Matching & Go Live Together
              </button>
            </form>
          ) : (
            <div className={styles.searchingState}>
              <div className={styles.spinner}></div>
              <h2>Searching for a match...</h2>
              <p>Looking for someone who also wants to go live together</p>
              <p className={styles.searchInfo}>
                Matching: {lookingFor === 'any' ? 'Anyone' : lookingFor}
              </p>
              <button onClick={() => setIsSearching(false)} className={styles.cancelBtn}>
                Cancel Search
              </button>
            </div>
          )}

          <div className={styles.howItWorks}>
            <h3>How It Works</h3>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h4>Opt-In</h4>
                  <p>Choose to go live together and set your preferences</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <h4>Match</h4>
                  <p>Get matched with someone who also opted in</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <h4>Confirm</h4>
                  <p>Both of you confirm you want to go live</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>4</span>
                <div>
                  <h4>Go Live</h4>
                  <p>Start your public live stream together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
