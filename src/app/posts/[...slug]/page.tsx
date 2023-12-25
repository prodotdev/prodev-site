import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostProps {
  params: {
    slug: string
  }
}

export default function Post(props: PostProps) {
  const post = getPost(props.params)

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
      <h1>{post.frontMatter.title}</h1>

      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        }}
      />
    </article>
  )
}

function getPost({ slug }: { slug: string }) {
  const filePath = path.join('posts', slug + '.mdx')

  const markdownFile = fs.readFileSync(filePath, 'utf8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    slug,
    content,
  }
}
