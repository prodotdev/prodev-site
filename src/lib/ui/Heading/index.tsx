import classNames from 'classnames'
import { PropsWithChildren } from 'react'

import styles from '@/lib/ui/Heading/Heading.module.css'

interface HeadingProps extends PropsWithChildren {
  className?: string
}

export default function Heading(props: HeadingProps) {
  const { children, className } = props
  return <h1 className={classNames(styles.root, className)}>{children}</h1>
}
