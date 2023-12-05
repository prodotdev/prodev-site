import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/SideNav/Section/Section.module.css'
import ArrowUpIcon from '@/lib/icons/arrow-up-icon.svg'

interface SectionProps extends PropsWithChildren {
  title: string
}

export default function Section(props: SectionProps) {
  const { children, title } = props

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <ArrowUpIcon className={styles.arrowIcon} />
      </div>
      {children}
    </div>
  )
}
