import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/GoLive.module.css'

export default function GoLive() {
  const router = useRouter()
  const [streamTitle, setStreamTitle] = useState('')
  const [isStarting, setIsStarting] = useState(false)

  const handleStartStream = () => {
    if (!streamTitle.trim()) {
      alert('Please enter a stream title')
      return
    }

    setIsStarting(true)

    // Simulate starting stream
    setTimeout(() => {
      router.push('/streaming')
    }, 1500)
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">← Back</Link>
        <h2>Go Live</h2>
      </nav>

      <main className={styles.main}>
        <div className={styles.setupCard}>
          <h1>Start Your Live Stream</h1>
          <p className={styles.subtitle}>
            Connect with people in real-time through live video streaming
          </p>

          <div className={styles.previewSection}>
            <div className={styles.videoPreview}>
              <div className={styles.cameraPlaceholder}>
                📹
                <p>Camera Preview</p>
                <small>Your video will appear here</small>
              </div>
            </div>
          </div>

          <div className={styles.setupForm}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Stream Title *</label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Just chatting and meeting new people!"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                maxLength={100}
              />
              <small>{streamTitle.length}/100 characters</small>
            </div>

            <div className={styles.settingsSection}>
              <h3>Stream Settings</h3>

              <div className={styles.setting}>
                <label>
                  <input type="checkbox" defaultChecked />
                  Enable chat
                </label>
              </div>

              <div className={styles.setting}>
                <label>
                  <input type="checkbox" defaultChecked />
                  Allow viewers to send reactions
                </label>
              </div>

              <div className={styles.setting}>
                <label>
                  <input type="checkbox" />
                  Mature content (18+)
                </label>
              </div>
            </div>

            <div className={styles.guidelines}>
              <h4>⚠️ Community Guidelines</h4>
              <ul>
                <li>Be respectful to all viewers</li>
                <li>No harassment or hate speech</li>
                <li>No explicit content without marking as 18+</li>
                <li>Follow all local laws and regulations</li>
                <li>Streams are real-time only (not recorded)</li>
              </ul>
            </div>

            <button
              onClick={handleStartStream}
              disabled={isStarting || !streamTitle.trim()}
              className={styles.startBtn}
            >
              {isStarting ? '🔄 Starting Stream...' : '🔴 Start Live Stream'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
