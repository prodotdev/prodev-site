import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Link/Link.module.css'
import classNames from 'classnames'
import NextLink from 'next/link'

interface LinkProps extends PropsWithChildren {
  isActive?: boolean
  href: string
}

export default function Link(props: LinkProps) {
  const { children, isActive, href } = props
  return (
    <div
      className={classNames(styles.root, {
        [styles.active]: isActive,
      })}
    >
      <NextLink href={href}>{children}</NextLink>
    </div>
  )
}
