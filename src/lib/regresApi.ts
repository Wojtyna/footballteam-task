import axios from 'axios'

const API_URL = 'https://reqres.in/api'

interface User {
  id: string
  first_name: string
  last_name: string
  avatar: string
  email?: string
  [key: string]: any
}

interface UserResponse {
  data: User
}

interface UserListResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
  support: {
    url: string
    text: string
  }
}

const createUser = async (newUserData: User): Promise<UserResponse> =>
  await axios.post(`${API_URL}/users`, newUserData)

const getUsers = async (page: number): Promise<UserListResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/users`, { params: { page: String(page) } })
    return data
  } catch (error: any) {
    return error
  }
}

const getUser = async (userId: string): Promise<UserResponse> => {
  try {
    const { data } = await axios.get(`${API_URL}/users/${userId}`)
    return data
  } catch (error: any) {
    return error
  }
}

const updateUser = async (userId: string, updatedUserData: User): Promise<UserResponse> => {
  try {
    const { data } = await axios.put(`${API_URL}/users/${userId}`, updatedUserData)
    return data
  } catch (error: any) {
    return error
  }
}

const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`)
    return true
  } catch (error: any) {
    return error
  }
}

export { type User }
export { createUser, getUsers, updateUser, deleteUser, getUser }
