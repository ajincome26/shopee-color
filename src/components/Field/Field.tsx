interface Props {
  children: JSX.Element | JSX.Element[]
}

const Field = ({ children }: Props) => {
  return <div className='flex flex-col gap-3'>{children}</div>
}

export default Field
