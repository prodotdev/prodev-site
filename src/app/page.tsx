import AppBar from '@/app/_components/AppBar'
import styles from '@/app/_components/Home.module.css'
import PostNav from '@/app/_components/DesktopPostNav'
import imagePlaceholder from '@/app/_components/image-placeholder.png'
import Heading from '@/lib/ui/Heading'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import Title from '@/lib/ui/Title'
import Image from 'next/image'
import PostSection from '@/lib/ui/PostSection'

export default function Home() {
  return (
    <div className={styles.root}>
      <AppBar />
      <Page>
        <PageMain>
          <Title className={styles.title}>Routing</Title>
          <PostSection>
            <p>
              A page is UI that is unique to a route. You can define pages by
              exporting a component from a page.js file. Use nested folders to
              define a route and a <strong>page.js</strong> file to make the
              route publicly accessible.
            </p>
            <p>
              Create your first page by adding a page.js file inside the app
              directory:
            </p>
            <Image src={imagePlaceholder} alt="placeholder" />
          </PostSection>
          <div className="divider" />
          <PostSection>
            <Heading>Nesting Layouts</Heading>
            <p>
              Layouts defined inside a folder (e.g. app/dashboard/layout.js)
              apply to specific route segments (e.g. acme.com/dashboard) and
              render when those segments are active. By default,{' '}
              <a href="#">layouts in the file</a> hierarchy are nested, which
              means they wrap child layouts via their children prop.
            </p>
          </PostSection>
        </PageMain>
      </Page>
    </div>
  )
}
