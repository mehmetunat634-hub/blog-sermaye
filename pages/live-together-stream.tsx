import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { User, Radio, Users, Clock, Mic, Video, Square, Globe } from 'lucide-react'
import styles from '@/styles/LiveTogetherStream.module.css'

interface ChatMessage {
  id: number
  username: string
  message: string
  timestamp: string
}

export default function LiveTogetherStream() {
  const router = useRouter()
  const [viewers, setViewers] = useState(0)
  const [duration, setDuration] = useState(0)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 20) - 5))
    }, 3000)

    // Track stream duration
    const durationInterval = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)

    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      const mockMessages = [
        'Great chemistry!',
        'You two are awesome!',
        'Love this stream!',
        'Where are you from?',
        'This is so cool!'
      ]

      if (Math.random() > 0.6) {
        setChatMessages(prev => [...prev, {
          id: Date.now(),
          username: `Viewer${Math.floor(Math.random() * 1000)}`,
          message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
          timestamp: new Date().toLocaleTimeString()
        }])
      }
    }, 4000)

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
    if (confirm('Are you sure you want to end this live stream? Your partner will also be disconnected.')) {
      router.push('/profile')
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
          <div className={styles.splitView}>
            <div className={styles.videoPanel}>
              <div className={styles.videoPlaceholder}>
                <span className={styles.avatar}><User size={64} /></span>
                <p>You</p>
              </div>
              <span className={styles.nameTag}>You</span>
            </div>
            <div className={styles.videoPanel}>
              <div className={styles.videoPlaceholder}>
                <span className={styles.avatar}><User size={64} /></span>
                <p>Sarah</p>
              </div>
              <span className={styles.nameTag}>Sarah</span>
            </div>
          </div>

          <div className={styles.streamInfo}>
            <div className={styles.liveIndicator}>
              <span className={styles.livePulse}><Radio size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LIVE TOGETHER</span>
              <span className={styles.publicBadge}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> PUBLIC STREAM</span>
            </div>
            <div className={styles.stats}>
              <span><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers} watching</span>
              <span><Clock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {formatDuration(duration)}</span>
            </div>
          </div>

          <div className={styles.controls}>
            <button className={styles.controlBtn}>
              <Mic size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Mute
            </button>
            <button className={styles.controlBtn}>
              <Video size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Camera
            </button>
            <button onClick={handleEndStream} className={styles.endBtn}>
              <Square size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> End Stream
            </button>
          </div>
        </div>

        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h3>Live Chat</h3>
            <span className={styles.viewerCount}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers}</span>
          </div>

          <div className={styles.publicNotice}>
            <p><Globe size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> This is a public stream - everyone can watch and chat</p>
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
              placeholder="Chat with viewers..."
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
