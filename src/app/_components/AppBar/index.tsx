import logo from '@/lib/images/logo-white.png'
import Image from 'next/image'

export default function AppBar() {
  return (
    <div>
      <Image src={logo} width={112} height={36} alt="prodev" />
    </div>
  )
}
