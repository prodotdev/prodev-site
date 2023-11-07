import AppBar from '@/app/_components/AppBar'
import styles from '@/app/_components/Home.module.css'
import imagePlaceholder from '@/app/_components/image-placeholder.png'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.root}>
      <AppBar />
      <div>
        <h1>Routing</h1>
        <p>
          A page is UI that is unique to a route. You can define pages by
          exporting a component from a page.js file. Use nested folders to
          define a route and a <strong>page.js</strong> file to make the route
          publicly accessible.
        </p>
        <p>
          Create your first page by adding a page.js file inside the app
          directory:
        </p>
        <Image src={imagePlaceholder} alt="placeholder" />
        <div className="divider" />
        <h2>Nesting Layouts</h2>
        <p>
          Layouts defined inside a folder (e.g. app/dashboard/layout.js) apply
          to specific route segments (e.g. acme.com/dashboard) and render when
          those segments are active. By default,{' '}
          <a href="#">layouts in the file</a> hierarchy are nested, which means
          they wrap child layouts via their children prop.
        </p>
      </div>
    </div>
  )
}
