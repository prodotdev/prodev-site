import styles from '@/lib/ui/Sidebar/Sidebar.module.css'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface SidebarProps extends PropsWithChildren {
  className?: string
}

export default function Sidebar(props: SidebarProps) {
  const { children, className } = props
  return <div className={classNames(styles.root, className)}>{children}</div>
}
