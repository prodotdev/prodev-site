import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Section/Section.module.css'
import ArrowUpIcon from '@/lib/icons/arrow-up-icon.svg'

interface SectionProps extends PropsWithChildren {
  title: string
}

export default function Section(props: SectionProps) {
  const { children, title } = props
  return (
    <div>
      <div className={styles.header}>
        <span>{title}</span>
        <ArrowUpIcon className={styles.arrowIcon} />
      </div>
      {children}
    </div>
  )
}
