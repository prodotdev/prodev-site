import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

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

      <br />
      <h2>LINKS</h2>
      <ul>
        {post.links.map((link) => (
          <li key={link.title}>
            <Link href={link.path}>
              {link.isCurrent ? <strong>{link.title}</strong> : link.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export async function generateStaticParams() {
  const files = getFiles(path.join('posts'))

  const paths = files.map((filename) => {
    const slug = filename.replace('.mdx', '').split('/')
    slug.shift() // remove initial '/posts' path

    return { slug }
  })

  console.log(paths)

  return paths
}

function getFiles(dirPath: string) {
  const results: string[] = []

  try {
    const files: string[] = fs.readdirSync(dirPath)

    for (const file of files) {
      const filePath = path.join(dirPath, file)
      const isDir = !file.includes('.mdx')
      if (isDir) {
        const nested = getFiles(filePath)
        results.push(...nested)
      } else {
        results.push(filePath)
      }
    }
  } catch (error) {
    console.error(error)
    //
  }
  return results
}

function getPost(urlPaths: string[]) {
  const postPath = urlPaths.join('/')
  const filePath = path.join('posts', postPath + '.mdx')

  const links = []

  const parentDir = path.join('posts', urlPaths.slice(0, -1).join('/'))
  try {
    const targetPost = urlPaths.at(-1) + '.mdx'
    const siblingPosts = fs.readdirSync(parentDir)

    for (const post of siblingPosts) {
      const siblingPath = `${parentDir}/${post}`

      const siblingPage = fs.readFileSync(siblingPath, 'utf8')
      const { data: frontMatter } = matter(siblingPage)

      links.push({
        title: frontMatter.title,
        isCurrent: post === targetPost,
        path: `/${siblingPath.replace('.mdx', '')}`,
      })
    }
  } catch {
    //
  }

  const markdownFile = fs.readFileSync(filePath, 'utf8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    content,
    links,
  }
}
