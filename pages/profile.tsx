import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Save, Pencil, Radio, Settings } from 'lucide-react'
import styles from '@/styles/Profile.module.css'

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: 30,
    bio: 'Love meeting new people and having great conversations!',
    interests: ['Music', 'Travel', 'Photography', 'Food'],
    avatar: 'user'
  })

  const [isEditing, setIsEditing] = useState(false)

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
        <h2>My Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editBtn}
        >
          {isEditing ? (
            <><Save size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Save</>
          ) : (
            <><Pencil size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Edit</>
          )}
        </button>
      </nav>

      <main className={styles.main}>
        <div className={`${styles.profileCard} animate-scale-in`}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}><User size={96} /></div>
            {isEditing && (
              <button className={styles.changeAvatarBtn}>Change Avatar</button>
            )}
          </div>

          <div className={styles.infoSection}>
            <div className={styles.field}>
              <label>Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
              ) : (
                <p>{profile.name}, {profile.age}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>Bio</label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <p>{profile.bio}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>Interests</label>
              <div className={styles.interests}>
                {profile.interests.map((interest, index) => (
                  <span key={index} className={styles.interestTag}>
                    {interest}
                    {isEditing && (
                      <button className={styles.removeInterest}>×</button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <button className={styles.addInterest}>+ Add</button>
                )}
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>12</span>
              <span className={styles.statLabel}>Matches</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>5</span>
              <span className={styles.statLabel}>Live Streams</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>234</span>
              <span className={styles.statLabel}>Total Viewers</span>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Link href="/go-live" className={styles.goLiveBtn}>
            <Radio size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Go Live
          </Link>
          <Link href="/settings" className={styles.settingsBtn}>
            <Settings size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Settings
          </Link>
        </div>
      </main>
    </div>
  )
}
