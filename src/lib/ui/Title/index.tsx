import { PropsWithChildren } from 'react'
import styles from '@/lib/ui/Title/Title.module.css'
import classNames from 'classnames'

interface TitleProps extends PropsWithChildren {
  className?: string
}

export default function Title(props: TitleProps) {
  const { children, className } = props
  return <h1 className={classNames(styles.root, className)}>{children}</h1>
}
