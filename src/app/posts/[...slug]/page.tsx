import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Title from '@/lib/ui/Title'
import styles from '@/app/posts/[...slug]/_components/Post.module.css'
import Heading from '@/lib/ui/Heading'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import AppBar from '@/app/_components/AppBar'

interface PostProps {
  params: {
    slug: string[]
  }
}

interface PostData {
  title?: string
  tags?: string[]
  content: string
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
                  rehypePlugins: [],
                },
              }}
              components={{
                h1: (props) => <Title className={styles.title} {...props} />,
                h2: Heading,
              }}
            />
          </div>
        </PageMain>
      </Page>
    </div>
  )
}

function getPost(urlPaths: string[]) {
  try {
    return readPostFile(urlPaths)
  } catch {
    return null
  }
}

function readPostFile(urlPaths: string[]): PostData {
  const postPath = urlPaths.join('/')
  const filePath = path.join('posts', postPath + '.mdx')

  const markdownFile = fs.readFileSync(filePath, 'utf8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    ...frontMatter,
    content,
  }
}
