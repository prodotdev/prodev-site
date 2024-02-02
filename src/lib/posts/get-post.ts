import fs from 'node:fs'
import matter from 'gray-matter'
import { PostData } from '@/lib/posts'
import path from 'node:path'
import { getDirectory } from '@/lib/posts/get-directory'
import { getRelatedPosts } from '@/lib/posts/get-related-posts'

export function getPost(urlPaths: string[]) {
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

  // Posts can be nested 2 levels: Series > Topics > Post
  const hasTopic = urlPaths.length > 2

  const parentPath = urlPaths.slice(0, -1)

  const parentPosts = getRelatedPosts(parentPath)
  const siblingPosts = getRelatedPosts(urlPaths)

  const series = getDirectory(hasTopic ? parentPath : urlPaths)
  const topic = hasTopic ? getDirectory(urlPaths) : null

  const { data: frontMatter, content } = matter(markdownFile)

  if (topic && series) {
    return {
      ...frontMatter,
      content,
      series: {
        title: series.title,
        path: series.path,
        links: parentPosts,
      },
      topic: {
        title: topic.title,
        path: topic.path,
        links: siblingPosts,
      },
    }
  }

  if (series) {
    return {
      ...frontMatter,
      content,
      series: {
        title: series.title,
        path: series.path,
        links: siblingPosts,
      },
      topic: null,
    }
  }

  return {
    ...frontMatter,
    content,
    series: null,
    topic: null,
  }
}
