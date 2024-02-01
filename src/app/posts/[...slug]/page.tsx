import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Title from '@/lib/ui/Title'
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

  const post = readPostFile(slug)

  return (
    <div>
      <AppBar />
      <Page>
        <PageMain>
          <div>
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  rehypePlugins: [],
                },
              }}
              components={{
                h1: (props) => <Title {...props} />,
                h2: Heading,
              }}
            />
          </div>
        </PageMain>
      </Page>
    </div>
  )
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
