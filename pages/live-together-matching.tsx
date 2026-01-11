import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { User, Sparkles, AlertTriangle, X, Check } from 'lucide-react'
import styles from '@/styles/LiveTogetherMatching.module.css'

export default function LiveTogetherMatching() {
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bothAgreed, setBothAgreed] = useState(false)
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [partnerConfirmed, setPartnerConfirmed] = useState(false)

  useEffect(() => {
    // Simulate finding a match
    const matchTimeout = setTimeout(() => {
      setShowConfirmation(true)
    }, 2000)

    return () => clearTimeout(matchTimeout)
  }, [])

  useEffect(() => {
    if (hasConfirmed) {
      // Simulate partner confirming
      const partnerTimeout = setTimeout(() => {
        setPartnerConfirmed(true)
      }, 2000)

      return () => clearTimeout(partnerTimeout)
    }
  }, [hasConfirmed])

  useEffect(() => {
    if (hasConfirmed && partnerConfirmed) {
      setBothAgreed(true)
      // Start live stream
      setTimeout(() => {
        router.push('/live-together-stream')
      }, 2000)
    }
  }, [hasConfirmed, partnerConfirmed, router])

  const handleConfirm = () => {
    setHasConfirmed(true)
  }

  const handleDecline = () => {
    router.push('/go-live-together')
  }

  return (
    <div className={styles.container}>
      <div className={styles.matchInterface}>
        {!showConfirmation ? (
          <div className={styles.searchingScreen}>
            <div className={styles.spinner}></div>
            <h2>Finding your match...</h2>
            <p>Please wait while we find someone</p>
          </div>
        ) : !bothAgreed ? (
          <div className={styles.confirmationScreen}>
            <div className={styles.matchFound}>
              <h1>Match Found! <Sparkles size={28} style={{ display: 'inline', verticalAlign: 'middle' }} /></h1>
              <div className={styles.partnerPreview}>
                <div className={styles.partnerAvatar}><User size={64} /></div>
                <h2>Sarah, 28</h2>
                <p>Ready to go live together</p>
              </div>

              <div className={styles.finalWarning}>
                <h3><AlertTriangle size={24} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} /> Final Confirmation</h3>
                <p>
                  By clicking &quot;Go Live Together&quot;, you confirm that you want to start a
                  <strong> PUBLIC live stream</strong> with this person.
                </p>
                <p>
                  Your conversation will be visible to everyone on the platform.
                </p>
              </div>

              {!hasConfirmed ? (
                <div className={styles.actions}>
                  <button onClick={handleDecline} className={styles.declineBtn}>
                    <X size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> No, Go Back
                  </button>
                  <button onClick={handleConfirm} className={styles.confirmBtn}>
                    <Check size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Yes, Go Live Together
                  </button>
                </div>
              ) : !partnerConfirmed ? (
                <div className={styles.waitingForPartner}>
                  <div className={styles.spinner}></div>
                  <p>Waiting for your partner to confirm...</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className={styles.startingScreen}>
            <div className={styles.successIcon}><Check size={64} /></div>
            <h2>Both Confirmed!</h2>
            <p>Starting your live stream together...</p>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  )
}
