import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/SideNav/Link/Link.module.css'

interface LinkProps extends PropsWithChildren {
  isActive?: boolean
}

export default function Link(props: LinkProps) {
  const { children } = props
  return <div className={styles.section}>{children}</div>
}
