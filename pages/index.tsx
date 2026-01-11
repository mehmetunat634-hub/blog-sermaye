import { useState } from 'react'
import Link from 'next/link'
import { Heart, Radio, Video, Users, Sparkles, UserCircle2, Wifi, User } from 'lucide-react'
import styles from '@/styles/Home.module.css'

interface LiveStream {
  id: number
  username: string
  title: string
  viewers: number
  thumbnail: string
  isLive: boolean
}

const mockLiveStreams: LiveStream[] = [
  {
    id: 1,
    username: 'Sarah_M',
    title: 'Just chatting and meeting new people!',
    viewers: 234,
    thumbnail: '🎥',
    isLive: true
  },
  {
    id: 2,
    username: 'Mike_J',
    title: 'Good vibes only - come say hi!',
    viewers: 189,
    thumbnail: '🎬',
    isLive: true
  },
  {
    id: 3,
    username: 'Emma_K',
    title: 'Q&A and getting to know you',
    viewers: 456,
    thumbnail: '📹',
    isLive: true
  },
  {
    id: 4,
    username: 'Alex_R',
    title: 'Lets connect and chat!',
    viewers: 312,
    thumbnail: '🎞️',
    isLive: true
  }
]

export default function Home() {
  const [streams] = useState<LiveStream[]>(mockLiveStreams)

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navBrand}>
          <Heart size={24} fill="currentColor" />
          <h2>Blog Sermaye</h2>
        </div>
        <div className={styles.navLinks}>
          <Link href="/discover">Discover</Link>
          <Link href="/matches">My Matches</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/go-live" className={styles.goLiveBtn}>
            <Radio size={16} />
            <span>Go Live</span>
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Meet, Match & Stream <span className={styles.highlight}>Live</span>
          </h1>
          <p className={styles.description}>
            Connect with people through live video streaming and private video calls when you match
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/discover" className={styles.primaryBtn}>
              Start Matching
            </Link>
            <Link href="/go-live" className={styles.secondaryBtn}>
              Go Live Solo
            </Link>
            <Link href="/go-live-together" className={styles.liveTogetherBtn}>
              <Radio size={20} />
              <span>Go Live Together & Match</span>
            </Link>
          </div>
        </section>

        <section className={styles.liveSection}>
          <h2 className={styles.sectionTitle}>
            <Radio size={28} className={styles.liveIcon} />
            <span>Live Now</span>
          </h2>
          <div className={styles.streamsGrid}>
            {streams.map((stream) => (
              <Link
                key={stream.id}
                href={`/stream/${stream.id}`}
                className={styles.streamCard}
              >
                <div className={styles.streamThumbnail}>
                  <Video size={64} strokeWidth={1.5} />
                  {stream.isLive && (
                    <span className={styles.liveBadge}>
                      <Radio size={14} />
                      <span>LIVE</span>
                    </span>
                  )}
                </div>
                <div className={styles.streamInfo}>
                  <h3>{stream.username}</h3>
                  <p className={styles.streamTitle}>{stream.title}</p>
                  <span className={styles.viewers}>
                    <Users size={16} />
                    <span>{stream.viewers} watching</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <UserCircle2 size={48} strokeWidth={1.5} className={styles.featureIcon} />
              <h3>Create Profile</h3>
              <p>Set up your profile and preferences</p>
            </div>
            <div className={styles.featureCard}>
              <Sparkles size={48} strokeWidth={1.5} className={styles.featureIcon} />
              <h3>Match & Connect</h3>
              <p>Discover people and match with those you like</p>
            </div>
            <div className={styles.featureCard}>
              <Video size={48} strokeWidth={1.5} className={styles.featureIcon} />
              <h3>Private Video Call</h3>
              <p>Have private real-time video calls with matches</p>
            </div>
            <div className={styles.featureCard}>
              <Radio size={48} strokeWidth={1.5} className={styles.featureIcon} />
              <h3>Stream Live Solo</h3>
              <p>Go live publicly by yourself</p>
            </div>
            <div className={styles.featureCard}>
              <Wifi size={48} strokeWidth={1.5} className={styles.featureIcon} />
              <h3>Go Live Together</h3>
              <p>Get matched & stream publicly together</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
