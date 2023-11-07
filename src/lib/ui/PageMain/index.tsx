import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/PageMain/PageMain.module.css'

interface PageMainProps extends PropsWithChildren {}

export default function PageMain(props: PageMainProps) {
  const { children } = props
  return <div className={styles.root}>{children}</div>
}
