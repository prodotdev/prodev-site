import { PropsWithChildren } from 'react'

interface LinkProps extends PropsWithChildren {
  isActive?: boolean
}

export default function Link(props: LinkProps) {
  const { children } = props
  return <a href="#">{children}</a>
}
