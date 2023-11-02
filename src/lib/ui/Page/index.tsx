import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Page/Page.module.css'

interface PageProps extends PropsWithChildren {}

export default function Page(props: PageProps) {
  const { children } = props

  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
