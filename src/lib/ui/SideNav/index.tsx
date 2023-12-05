import styles from '@/lib/ui/SideNav/SideNav.module.css'
import { PropsWithChildren } from 'react'

interface SideNavProps extends PropsWithChildren {}

export default function SideNav(props: SideNavProps) {
  const { children } = props
  return <div className={styles.root}>{children}</div>
}
