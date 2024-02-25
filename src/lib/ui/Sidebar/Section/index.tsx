import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Section/Section.module.css'
import Link from 'next/link'
import classNames from 'classnames'

interface SectionProps extends PropsWithChildren {
  title: string
  href: string
  isActive?: boolean
}

export default function Section(props: SectionProps) {
  const { children, title, href, isActive } = props
  return (
    <div>
      <Link
        href={href}
        className={classNames(styles.header, {
          [styles.headerActive]: isActive,
        })}
      >
        <span>{title}</span>
      </Link>
      {children}
    </div>
  )
}
