import '@/app/posts/[...slug]/_components/github-dark.css'

import path from 'node:path'

import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'

import AppBar from '@/app/_components/AppBar'
import DesktopPostNav from '@/app/_components/DesktopPostNav'
import styles from '@/app/posts/[...slug]/_components/Post.module.css'
import { getFiles } from '@/lib/file-system/get-files'
import { getPost } from '@/lib/posts/get-post'
import Heading from '@/lib/ui/Heading'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import Title from '@/lib/ui/Title'

interface PostProps {
  params: {
    slug: string[]
  }
}
export default function Post(props: PostProps) {
  const {
    params: { slug },
  } = props

  const post = getPost(slug)
  if (!post) {
    return notFound()
  }

  return (
    <div className={styles.root}>
      <AppBar />
      <Page>
        <PageMain>
          <div className={styles.content}>
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  // @ts-expect-error: rehypeHighlight plugin doesn't fit MDXRemote types
                  rehypePlugins: [rehypeHighlight],
                },
              }}
              components={{
                h1: (props) => <Title className={styles.title} {...props} />,
                h2: Heading,
              }}
            />
          </div>
        </PageMain>
        {post.series && (
          <DesktopPostNav series={post.series} topic={post.topic} />
        )}
      </Page>
    </div>
  )
}

export async function generateStaticParams() {
  const files = getFiles(path.join('posts'), '.mdx')

  const paths = files.map((filename) => {
    const slug = filename.replace('.mdx', '').split('/')
    slug.shift() // remove initial '/posts' path

    return { slug }
  })

  return paths
}
