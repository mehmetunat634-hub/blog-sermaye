import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Video, Radio, Users, User, Check, Heart, Smile, ThumbsUp, Flame, PartyPopper } from 'lucide-react'
import styles from '@/styles/WatchStream.module.css'

interface ChatMessage {
  id: number
  username: string
  message: string
  timestamp: string
}

export default function WatchStream() {
  const router = useRouter()
  const { id } = router.query

  const [viewers, setViewers] = useState(234)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, username: 'User123', message: 'Hello everyone!', timestamp: '10:30 AM' },
    { id: 2, username: 'User456', message: 'Great stream!', timestamp: '10:31 AM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const viewerInterval = setInterval(() => {
      setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 20) - 8))
    }, 5000)

    return () => clearInterval(viewerInterval)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        username: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  const handleSendReaction = (emoji: string) => {
    // Show reaction animation
    console.log('Reaction sent:', emoji)
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">← Back to Home</Link>
      </nav>

      <div className={styles.streamLayout}>
        <div className={styles.videoSection}>
          <div className={styles.videoContainer}>
            <div className={styles.videoPlaceholder}>
              <span className={styles.videoIcon}><Video size={64} /></span>
              <p>Live Stream</p>
              <span className={styles.liveBadge}><Radio size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LIVE</span>
            </div>

            <div className={styles.streamOverlay}>
              <div className={styles.streamStats}>
                <span className={styles.livePulse}><Radio size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> LIVE</span>
                <span className={styles.viewerCount}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers} watching</span>
              </div>
            </div>
          </div>

          <div className={styles.streamInfo}>
            <div className={styles.streamerInfo}>
              <div className={styles.avatar}><User size={48} /></div>
              <div className={styles.details}>
                <h2>Sarah_M</h2>
                <p>Just chatting and meeting new people!</p>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={isFollowing ? styles.followingBtn : styles.followBtn}
              >
                {isFollowing ? (
                  <><Check size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Following</>
                ) : (
                  '+ Follow'
                )}
              </button>
            </div>
          </div>

          <div className={styles.reactions}>
            <button onClick={() => handleSendReaction('❤️')} className={styles.reactionBtn}><Heart size={24} /></button>
            <button onClick={() => handleSendReaction('😊')} className={styles.reactionBtn}><Smile size={24} /></button>
            <button onClick={() => handleSendReaction('👍')} className={styles.reactionBtn}><ThumbsUp size={24} /></button>
            <button onClick={() => handleSendReaction('🔥')} className={styles.reactionBtn}><Flame size={24} /></button>
            <button onClick={() => handleSendReaction('🎉')} className={styles.reactionBtn}><PartyPopper size={24} /></button>
          </div>
        </div>

        <div className={styles.chatSection}>
          <div className={styles.chatHeader}>
            <h3>Live Chat</h3>
            <span className={styles.chatViewers}><Users size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {viewers}</span>
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
              placeholder="Say something nice..."
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
