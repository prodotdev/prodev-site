import Sidebar from '@/lib/Sidebar'
import Link from '@/lib/Sidebar/Link'
import Section from '@/lib/Sidebar/Section'
import Title from '@/lib/Sidebar/Title'
import styles from '@/app/_components/PostNav.module.css'

export default function PostNav() {
  return (
    <Sidebar className={styles.root}>
      <Title>Building Your Application</Title>
      <Section title="Routing">
        <Link>Defining Routes</Link>
        <Link isActive>Pages and Layouts</Link>
        <Link>Linking and Navigating</Link>
      </Section>
    </Sidebar>
  )
}
