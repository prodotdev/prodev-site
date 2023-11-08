import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Heading/Heading.module.css'
import classNames from 'classnames'

interface HeadingProps extends PropsWithChildren {
  className?: string
}

export default function Heading(props: HeadingProps) {
  const { children, className } = props
  return <h1 className={classNames(styles.root, className)}>{children}</h1>
}
