import fs from 'node:fs'
import matter from 'gray-matter'
import { PostData } from '@/lib/posts'
import path from 'node:path'

export function getPost(urlPaths: string[]) {
  try {
    return readPostfile(urlPaths)
  } catch {
    return null
  }
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
