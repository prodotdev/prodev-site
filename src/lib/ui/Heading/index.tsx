import styles from '@/lib/ui/Heading/Heading.module.css'
import { PropsWithChildren } from 'react'

interface HeadingProps extends PropsWithChildren {}

export default function Heading(props: HeadingProps) {
  const { children } = props
  return <h2 className={styles.root}>{children}</h2>
}
