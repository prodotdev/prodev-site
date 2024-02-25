import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Link/Link.module.css'
import NextLink from 'next/link'

interface LinkProps extends PropsWithChildren {
  isActive?: boolean
  href: string
}

export default function Link(props: LinkProps) {
  const { children, isActive, href } = props
  return (
    <NextLink href={href}>
      <div
        className={classNames(styles.root, {
          [styles.active]: isActive,
        })}
      >
        {children}
      </div>
    </NextLink>
  )
}
