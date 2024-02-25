export interface PostData {
  title?: string
  tags?: string[]
  content: string
  series: PostLinkGroup | null
  topic: PostLinkGroup | null
}

export interface PostLinkGroup {
  title: string
  path: string
  links: PostLink[]
}

export interface PostLink {
  title: string
  isCurrent: boolean
  path: string
}
