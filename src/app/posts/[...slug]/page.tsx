import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

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
    return handleMissingPost(slug)
  }

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

      <Link href={`/posts/${post.frontMatter.series?.url}`}>
        <h2>{post.frontMatter.series?.name}</h2>
      </Link>
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

function handleMissingPost(urlPaths: string[]) {
  const firstPost = getFirstPost(urlPaths)
  if (firstPost) {
    return redirect(firstPost)
  }

  return notFound()
}

function getFirstPost(urlPaths: string[]) {
  const fullPath = path.join('posts', urlPaths.join('/'))
  const isDir = checkIsDirectory(fullPath)
  if (!isDir) {
    return null
  }

  const files: string[] = fs.readdirSync(fullPath)
  for (const file of files) {
    const filePath = `${fullPath}/${file}`
    if (file.includes('.mdx')) {
      return `/${filePath.replace('.mdx', '')}`
    }

    const isNestedDir = checkIsDirectory(filePath)
    if (!isNestedDir) {
      continue
    }

    const newPaths = filePath.split('/')
    newPaths.shift() // remove posts
    return getFirstPost(newPaths)
  }

  return null
}

function checkIsDirectory(dirPath: string) {
  try {
    return fs.lstatSync(dirPath).isDirectory()
  } catch {
    return false
  }
}

export async function generateStaticParams() {
  const files = getFiles(path.join('posts'))

  const paths = files.map((filename) => {
    const slug = filename.replace('.mdx', '').split('/')
    slug.shift() // remove initial '/posts' path

    return { slug }
  })

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
  } catch {
    // ignore failing to read any unknown directories/files
    // such as OS files, e.g. .DS_Store.
  }
  return results
}

function getPost(urlPaths: string[]) {
  try {
    return readPostFile(urlPaths)
  } catch {
    return null
  }
}

function readPostFile(urlPaths: string[]) {
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
    // ignore if post has no related posts
  }

  const markdownFile = fs.readFileSync(filePath, 'utf8')

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    frontMatter,
    content,
    links,
  }
}
