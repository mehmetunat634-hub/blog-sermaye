import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { User, Clock, Lock, Mic, MicOff, Video, VideoOff, Phone } from 'lucide-react'
import styles from '@/styles/VideoCall.module.css'

export default function VideoCall() {
  const router = useRouter()
  const { matchId } = router.query

  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate connection
    const connectTimeout = setTimeout(() => {
      setIsConnected(true)
    }, 2000)

    return () => clearTimeout(connectTimeout)
  }, [])

  useEffect(() => {
    if (!isConnected) return

    const durationInterval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)

    return () => clearInterval(durationInterval)
  }, [isConnected])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    if (confirm('Are you sure you want to end this call?')) {
      router.push('/matches')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.callInterface}>
        {!isConnected ? (
          <div className={styles.connectingScreen}>
            <div className={styles.spinner}></div>
            <h2>Connecting...</h2>
            <p>Setting up your video call with Sarah</p>
          </div>
        ) : (
          <>
            <div className={styles.videoGrid}>
              <div className={styles.remoteVideo}>
                <div className={styles.videoPlaceholder}>
                  <span className={styles.avatar}><User size={64} /></span>
                  <p className={styles.name}>Sarah</p>
                </div>
                <span className={styles.videoLabel}>Sarah</span>
              </div>

              <div className={styles.localVideo}>
                <div className={styles.videoPlaceholder}>
                  {isVideoOff ? (
                    <>
                      <span className={styles.avatar}><User size={64} /></span>
                      <p className={styles.name}>You (Video Off)</p>
                    </>
                  ) : (
                    <>
                      <span className={styles.avatar}><User size={64} /></span>
                      <p className={styles.name}>You</p>
                    </>
                  )}
                </div>
                <span className={styles.videoLabel}>You</span>
              </div>
            </div>

            <div className={styles.callInfo}>
              <span className={styles.callDuration}><Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {formatDuration(callDuration)}</span>
              <span className={styles.callStatus}><Lock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Private Call - Not Recorded</span>
            </div>

            <div className={styles.controls}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={isMuted ? styles.controlBtnActive : styles.controlBtn}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={isVideoOff ? styles.controlBtnActive : styles.controlBtn}
              >
                {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                <span>{isVideoOff ? 'Turn On Video' : 'Turn Off Video'}</span>
              </button>

              <button onClick={handleEndCall} className={styles.endCallBtn}>
                <Phone size={24} />
                <span>End Call</span>
              </button>
            </div>
          </>
        )}
      </div>

      <div className={styles.privacyNotice}>
        <p>
          <Lock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> This call is private and real-time only. It is NOT recorded or stored.
        </p>
      </div>
    </div>
  )
}
