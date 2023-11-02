import AppBar from '@/app/_components/AppBar'
import styles from '@/app/_components/Home.module.css'
import Image from 'next/image'
import imagePlaceholder from '@/app/_components/image-placeholder.jpeg'

export default function Home() {
  return (
    <div className={styles.root}>
      <AppBar />
      <div>
        <h1>Routing</h1>
        <p>
          The App Router inside Next.js 13 introduced new file conventions to
          easily create pages, shared layouts, and templates. This page will
          guide you through how to use these special files in your Next.js
          application.
        </p>
        <Image src={imagePlaceholder} alt="placeholder" />
        <p>
          A page is UI that is unique to a route. You can define pages by
          exporting a component from a <strong>page.js</strong> file. Use nested
          folders to define a route and a page.js file to make the route
          publicly accessible.
        </p>
        <div className="divider" />
        <h2>Nesting Layouts</h2>
        <p>
          Layouts defined inside a folder (e.g. app/dashboard/layout.js) apply
          to specific route segments (e.g. acme.com/dashboard) and render when
          those segments are active. By default,{' '}
          <a href="#">layouts in the file hierarchy</a>
          are nested, which means they wrap child layouts via their children
          prop.
        </p>
      </div>
    </div>
  )
}
