import { defineStore } from 'pinia'

import { getUsers, createUser, updateUser, deleteUser } from '@/lib/regresApi'

const useUsersStore = defineStore('users', {
  state: () => ({ users: [], currentPage: 1, pagesCount: -1, usersCount: -1 }),
  actions: {
    async createUser(newUserData) {
      const { error, data } = await createUser(newUserData)
      if (error) throw Error(error)
    },
    async setData(page = 1) {
      const { error, data, total, total_pages } = await getUsers(page)
      if (error) throw Error(error)
      this.users = data
      this.usersCount = total
      this.pagesCount = total_pages
      this.currentPage = page
    },
    async updateUser(userId, updatedUserData) {
      const { error } = await updateUser(userId, updatedUserData)
      if (error) throw Error(error)
    },
    async deleteUser(userId) {
      const { error } = await deleteUser(userId)
      if (error) throw Error(error)
      this.users.splice(
        this.users.findIndex((user) => user.id === userId),
        1
      )
    }
  }
})

export { useUsersStore }
