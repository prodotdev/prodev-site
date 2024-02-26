import { PropsWithChildren } from 'react'

import styles from '@/lib/ui/PostSection/PostSection.module.css'

interface PostSectionProps extends PropsWithChildren {}

export default function PostSection(props: PostSectionProps) {
  const { children } = props
  return <div className={styles.root}>{children}</div>
}
