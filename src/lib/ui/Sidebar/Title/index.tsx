import styles from '@/lib/ui/Sidebar/Title/Title.module.css'
import { PropsWithChildren } from 'react'

interface TitleProps extends PropsWithChildren {}

export default function Title(props: TitleProps) {
  const { children } = props
  return <div className={styles.root}>{children}</div>
}
