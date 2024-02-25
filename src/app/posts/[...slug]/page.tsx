import AppBar from '@/app/_components/AppBar'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Title from '@/lib/ui/Title'
import Heading from '@/lib/ui/Heading'
import styles from '@/app/posts/[...slug]/_components/Post.module.css'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts/get-post'
import DesktopPostNav from '@/app/_components/DesktopPostNav'

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
        {post.series && (
          <DesktopPostNav series={post.series} topic={post.topic} />
        )}
      </Page>
    </div>
  )
}
