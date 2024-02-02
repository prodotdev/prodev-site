import fs from 'node:fs'
import path from 'node:path'

export function getFirstPost(urlPaths: string[]) {
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
