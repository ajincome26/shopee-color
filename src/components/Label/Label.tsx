interface Props {
  htmlFor: string
  children: string
}

const Label = ({ htmlFor, children }: Props) => {
  return (
    <label className='my-3 font-semibold cursor-pointer text-secondary' htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label
