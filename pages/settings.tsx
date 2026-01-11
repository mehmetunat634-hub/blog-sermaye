import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  User,
  Lock,
  Bell,
  Eye,
  Globe,
  Smartphone,
  HelpCircle,
  Info,
  Shield,
  LogOut,
  ChevronRight,
  Mail,
  Camera,
  MapPin,
  Save
} from 'lucide-react'
import styles from '@/styles/Settings.module.css'

export default function Settings() {
  const router = useRouter()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState('public')
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [locationSharing, setLocationSharing] = useState(true)
  const [autoPlayVideos, setAutoPlayVideos] = useState(true)

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      // Handle logout logic
      router.push('/')
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion logic
      alert('Account deletion feature would be implemented here')
    }
  }

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
        <h2>Settings</h2>
        <Link href="/profile">Profile</Link>
      </nav>

      <main className={styles.main}>
        <div className={styles.settingsContainer}>
          {/* Account Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <User size={24} />
              <span>Account</span>
            </h2>

            <div className={styles.settingsList}>
              <Link href="/profile" className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <User size={20} />
                  <div>
                    <h3>Edit Profile</h3>
                    <p>Update your name, bio, and interests</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </Link>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Mail size={20} />
                  <div>
                    <h3>Email</h3>
                    <p>user@example.com</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Lock size={20} />
                  <div>
                    <h3>Change Password</h3>
                    <p>Update your password</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            </div>
          </section>

          {/* Privacy Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Shield size={24} />
              <span>Privacy & Safety</span>
            </h2>

            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Eye size={20} />
                  <div>
                    <h3>Profile Visibility</h3>
                    <p>Control who can see your profile</p>
                  </div>
                </div>
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className={styles.select}
                >
                  <option value="public">Public</option>
                  <option value="matches">Matches Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Globe size={20} />
                  <div>
                    <h3>Show Online Status</h3>
                    <p>Let others see when you&apos;re online</p>
                  </div>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={showOnlineStatus}
                    onChange={(e) => setShowOnlineStatus(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <MapPin size={20} />
                  <div>
                    <h3>Location Sharing</h3>
                    <p>Share your approximate location</p>
                  </div>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={locationSharing}
                    onChange={(e) => setLocationSharing(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Lock size={20} />
                  <div>
                    <h3>Blocked Users</h3>
                    <p>Manage blocked users</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Bell size={24} />
              <span>Notifications</span>
            </h2>

            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Bell size={20} />
                  <div>
                    <h3>Push Notifications</h3>
                    <p>Receive notifications on your device</p>
                  </div>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Mail size={20} />
                  <div>
                    <h3>Email Notifications</h3>
                    <p>Receive updates via email</p>
                  </div>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>
          </section>

          {/* App Preferences Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Smartphone size={24} />
              <span>App Preferences</span>
            </h2>

            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Camera size={20} />
                  <div>
                    <h3>Auto-play Videos</h3>
                    <p>Automatically play video streams</p>
                  </div>
                </div>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={autoPlayVideos}
                    onChange={(e) => setAutoPlayVideos(e.target.checked)}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Globe size={20} />
                  <div>
                    <h3>Language</h3>
                    <p>English (US)</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            </div>
          </section>

          {/* About & Help Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Info size={24} />
              <span>About & Help</span>
            </h2>

            <div className={styles.settingsList}>
              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <HelpCircle size={20} />
                  <div>
                    <h3>Help Center</h3>
                    <p>Get help and support</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Shield size={20} />
                  <div>
                    <h3>Privacy Policy</h3>
                    <p>Read our privacy policy</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Info size={20} />
                  <div>
                    <h3>Terms of Service</h3>
                    <p>Read our terms and conditions</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>

              <div className={styles.settingItem}>
                <div className={styles.settingInfo}>
                  <Info size={20} />
                  <div>
                    <h3>About</h3>
                    <p>Version 1.0.0</p>
                  </div>
                </div>
                <ChevronRight size={20} />
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <Shield size={24} />
              <span>Account Actions</span>
            </h2>

            <div className={styles.settingsList}>
              <button onClick={handleLogout} className={styles.dangerButton}>
                <LogOut size={20} />
                <span>Log Out</span>
              </button>

              <button onClick={handleDeleteAccount} className={styles.deleteButton}>
                <Shield size={20} />
                <span>Delete Account</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
