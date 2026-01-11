import Link from 'next/link'
import styles from '@/styles/Page.module.css'

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js and React.',
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Understanding Page Routing',
    excerpt: 'A deep dive into Next.js page-based routing system.',
    date: '2024-01-20'
  },
  {
    id: 3,
    title: 'Dynamic Routes in Next.js',
    excerpt: 'How to create dynamic routes and handle parameters in Next.js.',
    date: '2024-01-25'
  }
]

export default function Blog() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Blog Posts</h1>

        <div className={styles.blogList}>
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className={styles.blogCard}
            >
              <h2>{post.title}</h2>
              <p className={styles.date}>{post.date}</p>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.backLink}>
          &larr; Back to Home
        </Link>
      </main>
    </div>
  )
}
