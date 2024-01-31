import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from '@/lib/Sidebar/Sidebar.module.css'

interface SidebarProps extends PropsWithChildren {
  className?: string
}

export default function Sidebar(props: SidebarProps) {
  const { children, className } = props
  return <div className={classNames(styles.root, className)}>{children}</div>
}
