import AppBar from '@/app/_components/AppBar'
import path from 'node:path'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import fs from 'node:fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Title from '@/lib/ui/Title'
import Heading from '@/lib/ui/Heading'

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

  const post = readPostfile(slug)

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
                h1: Title,
                h2: Heading,
              }}
            />
          </div>
        </PageMain>
      </Page>
    </div>
  )
}

function readPostfile(urlPaths: string[]): PostData {
  const postPath = urlPaths.join('/')
  const filePath = path.join('posts', postPath + '.mdx')

  const markdownFile = fs.readFileSync(filePath, 'utf8')
  const { data: frontMatter, content } = matter(markdownFile)

  return {
    ...frontMatter,
    content,
  }
}
