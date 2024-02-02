import fs from 'node:fs'
import matter from 'gray-matter'
import path from 'node:path'
import { getFirstPost } from '@/lib/posts/get-first-post'
import { isDirectory } from '@/lib/posts/is-directory'
import { PostLink } from '@/lib/posts'

export function getRelatedPosts(urlPaths: string[]) {
  const links: PostLink[] = []
  const parentPath = urlPaths.slice(0, -1)
  const parentDir = path.join('posts', parentPath.join('/'))

  try {
    const siblingPosts = fs.readdirSync(parentDir)

    for (const post of siblingPosts) {
      const link = getLink(post, { urlPaths, parentDir, parentPath })
      if (link) {
        links.push(link)
      }
    }
  } catch {
    // ignore if post has no related posts
  }

  return links
}

interface GetLinkContext {
  urlPaths: string[]
  parentDir: string
  parentPath: string[]
}

function getLink(post: string, context: GetLinkContext): PostLink | null {
  const { urlPaths, parentDir, parentPath } = context

  const target = urlPaths.at(-1) + '.mdx'
  const siblingPath = `${parentDir}/${post}`

  if (post.includes('.mdx')) {
    const siblingPage = fs.readFileSync(siblingPath, 'utf8')
    const { data: frontMatter } = matter(siblingPage)

    return {
      title: frontMatter.title,
      isCurrent: post === target,
      path: `/${siblingPath.replace('.mdx', '')}`,
    }
  }

  if (!isDirectory(siblingPath)) {
    return null
  }

  const files = fs.readdirSync(siblingPath, 'utf8')
  if (!files.includes('info.json')) {
    return null
  }

  const infoPath = `${siblingPath}/info.json`
  const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'))

  const firstPost = getFirstPost(parentPath)
  if (!firstPost) {
    return null
  }

  return {
    title: info.title,
    isCurrent: siblingPath.includes(urlPaths.join('/')),
    path: firstPost,
  }
}
