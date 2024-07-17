import axios from 'axios'

const API_URL = 'https://reqres.in/api'

const createUser = async (newUserData) => {
  try {
    const { data } = await axios.post(`${API_URL}/users`, newUserData)
    return data
  } catch (error) {
    return { error }
  }
}

const getUsers = async (page) => {
  try {
    const { data } = await axios.get(`${API_URL}/users`, { params: { page } })
    return data
  } catch (error) {
    return { error }
  }
}

const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/users/${userId}`)
    return data
  } catch (error) {
    return { error }
  }
}

const updateUser = async (userId, updatedUserData) => {
  try {
    const { data } = await axios.put(`${API_URL}/users/${userId}`, updatedUserData)
    return data
  } catch (error) {
    return { error }
  }
}

const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`)
    return true
  } catch (error) {
    return { error }
  }
}

export { createUser, getUsers, updateUser, deleteUser, getUser }
