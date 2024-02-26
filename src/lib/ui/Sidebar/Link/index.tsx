import classNames from 'classnames'
import NextLink from 'next/link'
import { PropsWithChildren } from 'react'

import styles from '@/lib/ui/Sidebar/Link/Link.module.css'

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
