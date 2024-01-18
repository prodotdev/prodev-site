import { PropsWithChildren } from 'react'

interface TitleProps extends PropsWithChildren {}

export default function Title(props: TitleProps) {
  const { children } = props
  return <div>{children}</div>
}
