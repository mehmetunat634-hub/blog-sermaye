import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, MapPin, X, Heart } from 'lucide-react'
import styles from '@/styles/Discover.module.css'

interface User {
  id: number
  name: string
  age: number
  bio: string
  interests: string[]
  avatar: string
  distance: number
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    bio: 'Love traveling, music, and meeting new people. Looking for genuine connections!',
    interests: ['Travel', 'Music', 'Photography', 'Cooking'],
    avatar: 'user1',
    distance: 5
  },
  {
    id: 2,
    name: 'Mike',
    age: 32,
    bio: 'Tech enthusiast and coffee lover. Lets chat and see where it goes!',
    interests: ['Technology', 'Coffee', 'Hiking', 'Gaming'],
    avatar: 'user2',
    distance: 8
  },
  {
    id: 3,
    name: 'Emma',
    age: 26,
    bio: 'Artist and yoga instructor. Peace, love, and positive vibes only ✌️',
    interests: ['Art', 'Yoga', 'Meditation', 'Nature'],
    avatar: 'user3',
    distance: 3
  }
]

export default function Discover() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleLike = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handlePass = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const currentUser = users[currentIndex]

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
        <h2>Discover</h2>
        <Link href="/matches">Matches</Link>
      </nav>

      <main className={styles.main}>
        {currentUser && (
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}><User size={64} /></div>
              <div className={styles.profileInfo}>
                <h1>
                  {currentUser.name}, {currentUser.age}
                </h1>
                <p className={styles.distance}><MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> {currentUser.distance} km away</p>
              </div>
            </div>

            <div className={styles.profileContent}>
              <section className={styles.bioSection}>
                <h3>About</h3>
                <p>{currentUser.bio}</p>
              </section>

              <section className={styles.interestsSection}>
                <h3>Interests</h3>
                <div className={styles.interests}>
                  {currentUser.interests.map((interest, index) => (
                    <span key={index} className={styles.interestTag}>
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className={styles.actions}>
              <button onClick={handlePass} className={styles.passBtn}>
                <X size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Pass
              </button>
              <button onClick={handleLike} className={styles.likeBtn}>
                <Heart size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Like
              </button>
            </div>
          </div>
        )}

        <div className={styles.matchIndicator}>
          {currentIndex + 1} / {users.length}
        </div>
      </main>
    </div>
  )
}
