interface Props {
  htmlFor: string
  children: string
}

const Label = ({ htmlFor, children }: Props) => {
  return (
    <label className='font-semibold cursor-pointer' htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label
