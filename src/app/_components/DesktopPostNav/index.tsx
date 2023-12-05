import Sidebar from '@/lib/ui/Sidebar'
import Link from '@/lib/ui/Sidebar/Link'
import Section from '@/lib/ui/Sidebar/Section'
import Title from '@/lib/ui/Sidebar/Title'
import styles from '@/app/_components/DesktopPostNav/DesktopPostNav.module.css'

export default function DesktopPostNav() {
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
