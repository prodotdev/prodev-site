import AppBar from '@/app/_components/AppBar'
import styles from '@/app/_components/Home.module.css'
import imagePlaceholder from '@/app/_components/image-placeholder.png'
import Heading from '@/lib/ui/Heading'
import Page from '@/lib/ui/Page'
import PageMain from '@/lib/ui/PageMain'
import PostSection from '@/lib/ui/PostSection'
import Title from '@/lib/ui/Title'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.root}>
      <AppBar />
      <Page>
        <PageMain></PageMain>
      </Page>
    </div>
  )
}
