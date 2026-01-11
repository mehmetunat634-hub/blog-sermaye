import Link from 'next/link'
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
    avatar: '👩',
    lastMessage: 'Hey! How are you?',
    isOnline: true,
    matchedAt: '2 hours ago'
  },
  {
    id: 2,
    name: 'Emma',
    avatar: '👩‍🦰',
    lastMessage: 'Thanks for the match! 😊',
    isOnline: true,
    matchedAt: '1 day ago'
  },
  {
    id: 3,
    name: 'Lisa',
    avatar: '👱‍♀️',
    lastMessage: 'Would love to chat sometime',
    isOnline: false,
    matchedAt: '3 days ago'
  }
]

export default function Matches() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">← Back</Link>
        <h2>My Matches</h2>
        <Link href="/discover">Discover</Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.matchesGrid}>
          {mockMatches.map((match) => (
            <div key={match.id} className={styles.matchCard}>
              <div className={styles.matchHeader}>
                <div className={styles.avatarContainer}>
                  <span className={styles.avatar}>{match.avatar}</span>
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
                  💬 Chat
                </Link>
                <Link
                  href={`/video-call/${match.id}`}
                  className={styles.videoBtn}
                >
                  📹 Video Call
                </Link>
              </div>
            </div>
          ))}
        </div>

        {mockMatches.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>💔</p>
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
