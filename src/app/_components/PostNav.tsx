import SideNav from '@/lib/ui/SideNav'
import Link from '@/lib/ui/SideNav/Link'
import Section from '@/lib/ui/SideNav/Section'
import Title from '@/lib/ui/SideNav/Title'

export default function PostNav() {
  return (
    <SideNav>
      <Title>Building Your Application</Title>
      <Section title="Routing">
        <Link>Defining Routes</Link>
        <Link isActive>Pages and Layouts</Link>
        <Link>Linking and Navigating</Link>
      </Section>
    </SideNav>
  )
}
