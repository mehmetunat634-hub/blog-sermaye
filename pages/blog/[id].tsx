import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Page.module.css'

const blogContent: Record<string, { title: string; content: string; date: string }> = {
  '1': {
    title: 'Getting Started with Next.js',
    date: '2024-01-15',
    content: `
      Next.js is a powerful React framework that enables you to build production-ready
      applications with features like server-side rendering, static site generation,
      and API routes out of the box.

      In this post, we'll explore the basics of Next.js and how to get started
      with building your first application.

      Key features include:
      - File-based routing
      - Server-side rendering (SSR)
      - Static site generation (SSG)
      - API routes
      - Built-in CSS and Sass support
      - Fast refresh for instant feedback
    `
  },
  '2': {
    title: 'Understanding Page Routing',
    date: '2024-01-20',
    content: `
      Next.js uses a file-system based router where folders and files in the pages
      directory automatically become routes in your application.

      For example:
      - pages/index.tsx → /
      - pages/about.tsx → /about
      - pages/blog/index.tsx → /blog
      - pages/blog/[id].tsx → /blog/:id (dynamic route)

      This intuitive routing system makes it easy to structure your application
      and understand its URL structure at a glance.
    `
  },
  '3': {
    title: 'Dynamic Routes in Next.js',
    date: '2024-01-25',
    content: `
      Dynamic routes allow you to create pages with dynamic segments in the URL.
      In Next.js, you can create dynamic routes by using square brackets in your
      file names.

      For instance, [id].tsx creates a dynamic route where 'id' can be any value.
      You can access this parameter using the useRouter hook:

      const router = useRouter()
      const { id } = router.query

      This is perfect for blog posts, product pages, user profiles, and any
      content that requires dynamic URLs.
    `
  }
}

export default function BlogPost() {
  const router = useRouter()
  const { id } = router.query

  const post = blogContent[id as string]

  if (!post) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Post Not Found</h1>
          <Link href="/blog" className={styles.backLink}>
            &larr; Back to Blog
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <article className={styles.article}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>{post.date}</p>
          <div className={styles.content}>
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </article>

        <Link href="/blog" className={styles.backLink}>
          &larr; Back to Blog
        </Link>
      </main>
    </div>
  )
}
