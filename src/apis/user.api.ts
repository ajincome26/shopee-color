import instance from '~/utils/instance'
import { ResponseSuccess } from '~/types/utils.type'
import { User } from '~/types/user.type'

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string
  npassword?: string
  cpassword?: string
}

const userApi = {
  getUser: () => instance.get<ResponseSuccess<User>>('/me'),
  updateProfile: (body: BodyUpdateProfile) => instance.put<ResponseSuccess<User>>('/user', body),
  uploadAvatar: (body: FormData) =>
    instance.post<ResponseSuccess<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default userApi
