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
import DesktopPostNav, { NavGroup } from '@/app/_components/DesktopPostNav'

interface PostProps {
  params: {
    slug: string[]
  }
}

interface PostData {
  title?: string
  tags?: string[]
  content: string
  series?: NavGroup
  topic?: NavGroup
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

  const series = getGroup(hasSection ? urlPaths.slice(0, -1) : urlPaths)
  const topic = getGroup(hasSection ? urlPaths : [])

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
            path: getFirstPost(urlPaths.slice(0, -1)),
          })
        }
      }
    }
  } catch {
    // ignore if post has no related posts
  }

  return links
}

function getGroup(urlPaths: string[]) {
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
        url: getFirstPost(urlPaths.slice(0, -1)),
      }
    }
  } catch {
    //
  }

  return null
}
