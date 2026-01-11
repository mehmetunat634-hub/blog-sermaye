import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { User, Video } from 'lucide-react'
import styles from '@/styles/Chat.module.css'

interface Message {
  id: number
  text: string
  sender: 'user' | 'match'
  timestamp: string
}

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Hey! Thanks for matching with me 😊',
    sender: 'match',
    timestamp: '10:30 AM'
  },
  {
    id: 2,
    text: 'Hi! Nice to meet you!',
    sender: 'user',
    timestamp: '10:31 AM'
  },
  {
    id: 3,
    text: 'Would you like to have a video call sometime?',
    sender: 'match',
    timestamp: '10:32 AM'
  }
]

export default function Chat() {
  const router = useRouter()
  const { matchId } = router.query

  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage('')
    }
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/">← Back</Link>
        </div>
        <div className={styles.navCenter}>
          <div className={styles.matchInfo}>
            <span className={styles.avatar}><User size={40} /></span>
            <div>
              <h3>Sarah</h3>
              <span className={styles.onlineStatus}>🟢 Online</span>
            </div>
          </div>
        </div>
        <div className={styles.navRight}>
          <Link href={`/video-call/${matchId}`} className={styles.videoCallBtn}>
            <Video size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Video Call
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === 'user'
                  ? styles.messageUser
                  : styles.messageMatch
              }
            >
              <div className={styles.messageContent}>
                <p>{message.text}</p>
                <span className={styles.messageTime}>{message.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" disabled={!newMessage.trim()}>
            Send
          </button>
        </form>
      </main>
    </div>
  )
}
