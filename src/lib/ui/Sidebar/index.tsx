import { PropsWithChildren } from 'react'

interface SidebarProps extends PropsWithChildren {}

export default function Sidebar(props: SidebarProps) {
  const { children } = props
  return <div>{children}</div>
}
