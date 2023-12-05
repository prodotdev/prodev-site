import styles from '@/lib/ui/SideNav/SideNav.module.css'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

interface SideNavProps extends PropsWithChildren {
  className?: string
}

export default function SideNav(props: SideNavProps) {
  const { children, className } = props
  return <div className={classNames(styles.root, className)}>{children}</div>
}
