import Link from 'next/link'
import styles from '@/styles/Page.module.css'

export default function Contact() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact Us</h1>

        <div className={styles.content}>
          <p>
            Get in touch with us through any of the following channels:
          </p>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <h3>Email</h3>
              <p>info@blogsermaye.com</p>
            </div>

            <div className={styles.contactItem}>
              <h3>GitHub</h3>
              <p>github.com/blog-sermaye</p>
            </div>

            <div className={styles.contactItem}>
              <h3>Twitter</h3>
              <p>@blogsermaye</p>
            </div>
          </div>
        </div>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </main>
    </div>
  )
}
