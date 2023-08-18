import { AuthResponse } from '~/types/auth.type'
import instance from '~/utils/instance'

export const registerAccount = (body: { email: string; password: string }) =>
  instance.post<AuthResponse>('register', body)

export const loginAccount = (body: { email: string; password: string }) => instance.post<AuthResponse>('login', body)

export const logoutAccount = () => instance.post('logout')

// export const addStudent = (student: Omit<Student, 'id'>) => instance.post<Student>('students', student)

// export const getStudent = (id: number | string) => instance.get<Student>(`students/${id}`)

// export const updateStudent = (id: number | string, student: Student) => instance.put<Student>(`students/${id}`, student)

// export const deleteStudent = (id: number | string) => instance.delete<{}>(`students/${id}`)
