import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

const NotFound = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
      <h1 className='font-extrabold tracking-widest text-white text-9xl'>404</h1>
      <div className='absolute px-2 text-sm text-white rounded bg-primary rotate-12'>Page Not Found</div>
      <button className='mt-5'>
        <a className='relative inline-block text-sm font-medium text-white bg-primary group active:text-orange-500 focus:outline-none focus:ring'>
          <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0' />
          <span className='relative block px-8 py-3 bg-[#1A2238] border border-current'>
            <Link to={path.HOME}>Trang Chủ</Link>
          </span>
        </a>
      </button>
    </div>
  )
}

export default NotFound
