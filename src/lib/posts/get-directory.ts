import fs from 'node:fs'
import path from 'node:path'

import { getFirstPost } from '@/lib/posts/get-first-post'

export function getDirectory(urlPaths: string[]): {
  title: string
  path: string
} | null {
  const parentPath = urlPaths.slice(0, -1)
  const parentDir = path.join('posts', parentPath.join('/'))

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

      const firstPost = getFirstPost(parentPath)
      if (!firstPost) {
        return null
      }

      return {
        title: section.title,
        path: firstPost,
      }
    }
  } catch {
    //
  }

  return null
}
