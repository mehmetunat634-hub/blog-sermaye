import Link from 'next/link'
import Image from 'next/image'
import { User, MessageCircle, Video, HeartCrack } from 'lucide-react'
import styles from '@/styles/Matches.module.css'

interface Match {
  id: number
  name: string
  avatar: string
  lastMessage: string
  isOnline: boolean
  matchedAt: string
}

const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Sarah',
    avatar: 'user1',
    lastMessage: 'Hey! How are you?',
    isOnline: true,
    matchedAt: '2 hours ago'
  },
  {
    id: 2,
    name: 'Emma',
    avatar: 'user2',
    lastMessage: 'Thanks for the match! 😊',
    isOnline: true,
    matchedAt: '1 day ago'
  },
  {
    id: 3,
    name: 'Lisa',
    avatar: 'user3',
    lastMessage: 'Would love to chat sometime',
    isOnline: false,
    matchedAt: '3 days ago'
  }
]

export default function Matches() {
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
        <h2>My Matches</h2>
        <Link href="/discover">Discover</Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.matchesGrid}>
          {mockMatches.map((match) => (
            <div key={match.id} className={styles.matchCard}>
              <div className={styles.matchHeader}>
                <div className={styles.avatarContainer}>
                  <span className={styles.avatar}><User size={48} /></span>
                  {match.isOnline && <span className={styles.onlineDot}></span>}
                </div>
                <div className={styles.matchInfo}>
                  <h3>{match.name}</h3>
                  <p className={styles.matchTime}>Matched {match.matchedAt}</p>
                </div>
              </div>

              <p className={styles.lastMessage}>{match.lastMessage}</p>

              <div className={styles.matchActions}>
                <Link
                  href={`/chat/${match.id}`}
                  className={styles.chatBtn}
                >
                  <MessageCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Chat
                </Link>
                <Link
                  href={`/video-call/${match.id}`}
                  className={styles.videoBtn}
                >
                  <Video size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Video Call
                </Link>
              </div>
            </div>
          ))}
        </div>

        {mockMatches.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}><HeartCrack size={64} /></p>
            <h3>No matches yet</h3>
            <p>Start swiping to find your connections!</p>
            <Link href="/discover" className={styles.discoverBtn}>
              Discover People
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
