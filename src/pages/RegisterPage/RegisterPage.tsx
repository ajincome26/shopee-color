import { Field } from '~/components/Field'
import { Input } from '~/components/Input'
import { Label } from '~/components/Label'

const RegisterPage = () => {
  return (
    <div className='px-5 py-8 bg-primary'>
      <form className='flex flex-col w-full min-h-full gap-5 p-5 mx-auto bg-white rounded'>
        <h2 className='text-xl font-semibold'>Đăng Ký</h2>
        <Field>
          <Label htmlFor='email'>Email Address</Label>
          <Input name='email' placeholder='Enter your email' />
        </Field>
      </form>
    </div>
  )
}

export default RegisterPage
