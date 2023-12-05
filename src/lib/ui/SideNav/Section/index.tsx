import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/SideNav/Section/Section.module.css'

interface SectionProps extends PropsWithChildren {
  title: string
}

export default function Section(props: SectionProps) {
  const { children } = props
  return <div className={styles.section}>{children}</div>
}
