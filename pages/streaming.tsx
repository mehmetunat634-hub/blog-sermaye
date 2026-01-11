import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Video, Radio, Users, Clock, Mic, Settings, Square } from 'lucide-react'
import styles from '@/styles/Streaming.module.css'

interface ChatMessage {
  id: number
  username: string
  message: string
  timestamp: string
}

export default function Streaming() {
  const router = useRouter()
  const [viewers, setViewers] = useState(0)
  const [duration, setDuration] = useState(0)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 10) - 4))
    }, 3000)

    // Track stream duration
    const durationInterval = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)

    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      const mockMessages = [
        'Hey! Great stream!',
        'Hello from New York!',
        'Nice to meet you!',
        'Awesome vibes 😊',
        'Love your energy!'
      ]

      if (Math.random() > 0.7) {
        setChatMessages(prev => [...prev, {
          id: Date.now(),
          username: `User${Math.floor(Math.random() * 1000)}`,
          message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
          timestamp: new Date().toLocaleTimeString()
        }])
      }
    }, 5000)

    return () => {
      clearInterval(viewerInterval)
      clearInterval(durationInterval)
      clearInterval(messageInterval)
    }
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndStream = () => {
    if (confirm('Are you sure you want to end your live stream?')) {
      setIsLive(false)
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        username: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }])
      setNewMessage('')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.streamLayout}>
        <div className={styles.videoSection}>
          <div className={styles.videoContainer}>
            <div className={styles.videoPlaceholder}>
              {isLive ? (
                <>
                  <span className={styles.cameraIcon}><Video size={64} /></span>
                  <p>Your Live Stream</p>
                  <span className={styles.livePulse}><Radio size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LIVE</span>
                </>
              ) : (
                <>
                  <p>Stream Ended</p>
                  <p className={styles.thankYou}>Thanks for streaming!</p>
                </>
              )}
            </div>

            <div className={styles.streamOverlay}>
              <div className={styles.streamStats}>
                <span className={styles.liveBadge}><Radio size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LIVE</span>
                <span className={styles.viewerCount}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers}</span>
                <span className={styles.duration}><Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {formatDuration(duration)}</span>
              </div>
            </div>
          </div>

          <div className={styles.streamControls}>
            <button className={styles.controlBtn}>
              <Mic size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Mute
            </button>
            <button className={styles.controlBtn}>
              <Video size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Camera Off
            </button>
            <button className={styles.controlBtn}>
              <Settings size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Settings
            </button>
            <button onClick={handleEndStream} className={styles.endBtn}>
              <Square size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> End Stream
            </button>
          </div>
        </div>

        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h3>Live Chat</h3>
            <span className={styles.chatViewers}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers} viewers</span>
          </div>

          <div className={styles.chatMessages}>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={styles.chatMessage}>
                <span className={styles.chatUsername}>{msg.username}:</span>
                <span className={styles.chatText}>{msg.message}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className={styles.chatInput}>
            <input
              type="text"
              placeholder="Say something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
