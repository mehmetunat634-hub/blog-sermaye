import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Blog Sermaye</span>
        </h1>

        <p className={styles.description}>
          A Next.js project with page routing
        </p>

        <div className={styles.grid}>
          <Link href="/about" className={styles.card}>
            <h2>About &rarr;</h2>
            <p>Learn more about this project</p>
          </Link>

          <Link href="/blog" className={styles.card}>
            <h2>Blog &rarr;</h2>
            <p>Read our latest blog posts</p>
          </Link>

          <Link href="/contact" className={styles.card}>
            <h2>Contact &rarr;</h2>
            <p>Get in touch with us</p>
          </Link>

          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Documentation &rarr;</h2>
            <p>Learn about Next.js features</p>
          </a>
        </div>
      </main>
    </div>
  )
}
