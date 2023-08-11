interface Props {
  type?: string
  name: string
  placeholder: string
}

const Input = ({ type, name, placeholder }: Props) => {
  return (
    <input
      id={name}
      type={type || 'text'}
      placeholder={placeholder}
      className={`border border-transparent rounded-lg px-4 py-3 bg-grayField hover:border-primary transition`}
    />
  )
}

export default Input
