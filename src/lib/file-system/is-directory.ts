import fs from 'node:fs'

export function isDirectory(dirPath: string) {
  try {
    return fs.lstatSync(dirPath).isDirectory()
  } catch {
    return false
  }
}
