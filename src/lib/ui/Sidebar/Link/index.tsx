import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Sidebar/Link/Link.module.css'
import classNames from 'classnames'

interface LinkProps extends PropsWithChildren {
  isActive?: boolean
}

export default function Link(props: LinkProps) {
  const { children, isActive } = props
  return (
    <div
      className={classNames(styles.root, {
        [styles.active]: isActive,
      })}
    >
      <a href="#">{children}</a>
    </div>
  )
}
