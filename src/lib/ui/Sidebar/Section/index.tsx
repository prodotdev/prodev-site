import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Section/Section.module.css'

interface SectionProps extends PropsWithChildren {
  title: string
}

export default function Section(props: SectionProps) {
  const { children, title } = props
  return (
    <div>
      <div className={styles.header}>
        <span>{title}</span>
      </div>
      {children}
    </div>
  )
}
