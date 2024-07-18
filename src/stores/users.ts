import { defineStore } from 'pinia'

import { getUsers, createUser, updateUser, deleteUser, type User } from '@/lib/regresApi'

const useUsersStore = defineStore('users', {
  state: () => ({ users: <User[]>[], currentPage: 1, pagesCount: -1, usersCount: -1 }),
  actions: {
    async createUser(newUserData: User) {
      try {
        await createUser(newUserData)
      } catch (error: any) {
        throw Error(error)
      }
    },
    async setData(page = 1) {
      try {
        const { data, total, total_pages } = await getUsers(page)
        this.users = data
        this.usersCount = total
        this.pagesCount = total_pages
        this.currentPage = page
      } catch (error: any) {
        throw Error(error)
      }
    },
    async updateUser(userId: string, updatedUserData: User) {
      try {
        await updateUser(userId, updatedUserData)
      } catch (error: any) {
        throw Error(error)
      }
    },
    async deleteUser(userId: string) {
      try {
        await deleteUser(userId)
        this.users.splice(
          this.users.findIndex((user) => user.id === userId),
          1
        )
      } catch (error: any) {
        throw Error(error)
      }
    }
  }
})

export { useUsersStore }
