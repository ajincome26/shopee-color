import { RotatingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

interface Props {
  type?: 'submit' | 'reset'
  children: string | JSX.Element | JSX.Element[]
  isLoading?: boolean
  to?: string
  className?: string
}

const Button = ({ type, children, isLoading, to, className }: Props) => {
  if (to && typeof to === 'string') {
    return (
      <Link to={to || ''}>
        <button
          type={type || 'button'}
          className={`${className} block px-6 py-3 font-medium text-white transition duration-300 ease-linear bg-auto rounded-md md:w-56 md:mx-auto bg-gradient-to-br hover:opacity-90 from-third to-fourth hover:bg-gradient-to-tl focus:ring-4 focus:outline-none focus:ring-teal-300`}
        >
          {isLoading ? (
            <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.5' width='25' visible={true} />
          ) : (
            children
          )}
        </button>
      </Link>
    )
  }
  return (
    <button
      type={type || 'button'}
      className={`${className} block px-6 py-3 font-medium text-white transition duration-300 ease-linear bg-auto rounded-md md:w-56 md:mx-auto bg-gradient-to-br hover:opacity-90 from-third to-fourth hover:bg-gradient-to-tl focus:ring-4 focus:outline-none focus:ring-teal-300`}
    >
      {isLoading ? (
        <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.5' width='25' visible={true} />
      ) : (
        children
      )}
    </button>
  )
}

export default Button