import styles from '@/app/_components/DesktopPostNav/DesktopPostNav.module.css'
import type { PostLinkGroup } from '@/lib/posts'
import Sidebar from '@/lib/ui/Sidebar'
import Link from '@/lib/ui/Sidebar/Link'
import Section from '@/lib/ui/Sidebar/Section'
import Title from '@/lib/ui/Sidebar/Title'

interface DesktopPostNavProps {
  series: PostLinkGroup
  topic: PostLinkGroup | null
}

export default function DesktopPostNav(props: DesktopPostNavProps) {
  const { series, topic } = props

  return (
    <Sidebar className={styles.root}>
      <Title>{series.title}</Title>

      {series.links.map((seriesLink) => (
        <Section
          key={seriesLink.title}
          title={seriesLink.title}
          href={seriesLink.path}
          isActive={seriesLink.isCurrent}
        >
          {seriesLink.isCurrent &&
            topic?.links.map((topicLink) => (
              <Link
                key={topicLink.title}
                isActive={topicLink.isCurrent}
                href={topicLink.path}
              >
                {topicLink.title}
              </Link>
            ))}
        </Section>
      ))}
    </Sidebar>
  )
}
