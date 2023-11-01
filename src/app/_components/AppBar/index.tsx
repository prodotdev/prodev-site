import logo from '@/lib/images/logo-white.png'
import Image from 'next/image'
import styles from '@/app/_components/AppBar/AppBar.module.css'

export default function AppBar() {
  return (
    <div className={styles.root}>
      <Image src={logo} width={112} height={36} alt="prodev" />
    </div>
  )
}
