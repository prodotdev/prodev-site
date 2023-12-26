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

interface PostData {
  title?: string
  tags?: string[]
  content: string
  series?: PostGroup
  topic?: PostGroup
}

interface PostGroup {
  title: string
  url: string
  links: PostLink[]
}

interface PostLink {
  title: string
  path: string
  isCurrent: boolean
}

export default function Post(props: PostProps) {
  const {
    params: { slug },
  } = props

  const post = getPost(slug)
  if (!post) {
    return handleMissingPost(slug)
  }

  console.log(post.series)

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto">
      <h1>{post.title}</h1>

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

      {post.series && <Link href={post.series?.url}>{post.series?.title}</Link>}
      <h2>Series</h2>
      <ul>
        {post.series?.links.map((link) => (
          <li key={link.title}>
            <Link href={link.path}>
              {link.isCurrent ? <strong>{link.title}</strong> : link.title}
            </Link>
          </li>
        ))}
      </ul>

      {post.topic && <Link href={post.topic?.url}>{post.topic?.title}</Link>}
      <h2>Topics</h2>
      <ul>
        {post.topic?.links.map((link) => (
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

function readPostFile(urlPaths: string[]): PostData {
  const postPath = urlPaths.join('/')
  const filePath = path.join('posts', postPath + '.mdx')

  const hasSection = urlPaths.length > 2

  const series = getGroupInfo(hasSection ? urlPaths.slice(0, -1) : urlPaths)
  const topic = getGroupInfo(hasSection ? urlPaths : [])

  const relatedPosts = getRelatedPosts(urlPaths)
  const markdownFile = fs.readFileSync(filePath, 'utf8')
  const seriesLinks = getRelatedPosts(urlPaths.slice(0, -1))

  const { data: frontMatter, content } = matter(markdownFile)

  return {
    ...frontMatter,
    content,
    series: series
      ? {
          ...series,
          links: topic ? seriesLinks : relatedPosts,
        }
      : undefined,
    topic: topic
      ? {
          ...topic,
          links: topic ? relatedPosts : [],
        }
      : undefined,
  }
}

function getRelatedPosts(urlPaths: string[]) {
  const links = []
  const parentDir = path.join('posts', urlPaths.slice(0, -1).join('/'))

  try {
    const targetPost = urlPaths.at(-1) + '.mdx'
    const siblingPosts = fs.readdirSync(parentDir)

    for (const post of siblingPosts) {
      const siblingPath = `${parentDir}/${post}`

      if (post.includes('.mdx')) {
        const siblingPage = fs.readFileSync(siblingPath, 'utf8')
        const { data: frontMatter } = matter(siblingPage)

        links.push({
          title: frontMatter.title,
          isCurrent: post === targetPost,
          path: `/${siblingPath.replace('.mdx', '')}`,
        })
      }

      if (checkIsDirectory(siblingPath)) {
        const siblingDirFiles = fs.readdirSync(siblingPath, 'utf8')
        if (siblingDirFiles.includes('info.json')) {
          const infoPath = `${siblingPath}/info.json`
          const infoFile = JSON.parse(fs.readFileSync(infoPath, 'utf8'))

          links.push({
            title: infoFile.title,
            isCurrent: siblingPath.includes(urlPaths.join('/')),
            path: `/${siblingPath}`,
          })
        }
      }
    }
  } catch {
    // ignore if post has no related posts
  }

  return links
}

function getGroupInfo(urlPaths: string[]) {
  const parentDir = path.join('posts', urlPaths.slice(0, -1).join('/'))

  try {
    const files = fs.readdirSync(parentDir)

    for (const file of files) {
      if (file !== 'info.json') {
        continue
      }
      const infoPath = `${parentDir}/${file}`

      const infoPathsArray = parentDir.split('/')
      infoPathsArray.shift()
      const infoFile = fs.readFileSync(infoPath, 'utf8')
      const section = JSON.parse(infoFile)

      return {
        ...section,
        url: `/posts/${infoPathsArray.join('/')}`,
      }
    }
  } catch {
    //
  }

  return null
}
