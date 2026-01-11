import Link from 'next/link'
import styles from '@/styles/Page.module.css'

export default function About() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>About Us</h1>

        <div className={styles.content}>
          <p>
            Welcome to Blog Sermaye, a modern Next.js application built with
            the Pages Router and React.
          </p>

          <h2>Features</h2>
          <ul>
            <li>Next.js Pages Router</li>
            <li>React 18</li>
            <li>TypeScript support</li>
            <li>Dynamic routing</li>
            <li>API routes</li>
            <li>CSS Modules</li>
          </ul>

          <h2>Technologies Used</h2>
          <ul>
            <li><strong>Next.js</strong> - React framework for production</li>
            <li><strong>React</strong> - UI library</li>
            <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
          </ul>
        </div>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </main>
    </div>
  )
}
