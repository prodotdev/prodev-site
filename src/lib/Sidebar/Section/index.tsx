import { PropsWithChildren } from 'react'

interface SectionProps extends PropsWithChildren {
  title: string
}

export default function Section(props: SectionProps) {
  const { children, title } = props
  return (
    <div>
      <div>
        <span>{title}</span>
      </div>
      {children}
    </div>
  )
}
