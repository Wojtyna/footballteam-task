<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/24/solid'

import Pagination from '@/components/Pagination.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

const VISIBLE_PAGINATION_BUTTONS = 11
const FALLBACK_ITEMS_COUNT = 5

const UserStore = useUsersStore()
const UsersFiltered = ref(null)

onMounted(async () => {
  await UserStore.setData()
})

watchEffect(() => {
  UsersFiltered.value = UserStore.users
})

const filterInputChange = (inputValue) => {
  const normalizedInput = inputValue.toLowerCase()
  UsersFiltered.value = UserStore.users.filter((user) => {
    const normalizeUserName = (user.first_name + ' ' + user.last_name).toLowerCase()
    return !!normalizeUserName.includes(normalizedInput)
  })
}

const handleUserDelete = async (userId) => {
  await UserStore.deleteUser(userId)
}
const handleUserEdit = (userId) => {
  router.push({
    path: 'update-user',
    query: {
      id: userId
    }
  })
}
const handleNewUserClick = () => {
  router.push('/add-user')
}
</script>

<template>
  <main class="view-flex view-vertical view-horizontal gap-3">
    <h1>User list</h1>
    <section class="flex-1 h-0 overflow-hidden flex flex-col bg-white border rounded-md p-6 gap-4">
      <div
        class="flex max-sm:flex-col justify-between w-full border-b pb-4 gap-4 border-background"
      >
        <Input name="filter" placeholder="Search for users..." @onChange="filterInputChange">
          <template #after>
            <MagnifyingGlassIcon class="size-4 shrink-0" />
          </template>
        </Input>
        <Button @click="handleNewUserClick"
          ><PlusIcon class="size-4 shrink-0 -ml-1" />Add User</Button
        >
      </div>
      <div class="flex-1 h-0 flex flex-col">
        <div class="p-3 gap-3 flex items-center font-montserrat-extrabold text-sm text-light-4">
          <div class="w-8 sm:w-16 shrink-0" />
          <div class="flex-1">Full Name</div>
          <div class="shrink-0 md:pr-10 md:mr-2">Action</div>
        </div>
        <ul class="flex-1 overflow-y-auto">
          <!-- FALLBACK -->
          <li
            v-for="_ in Array(FALLBACK_ITEMS_COUNT).fill(null)"
            v-if="!UsersFiltered"
            class="w-full h-16 flex items-center p-3 gap-3 rounded-md bg-background animate-pulse mb-2"
          />
          <!-- END FALLBACK -->
          <li
            v-if="!!UsersFiltered"
            v-for="(user, index) in UsersFiltered"
            :class="{ 'bg-background': index % 2 === 0 }"
            class="w-full flex items-center p-3 gap-3 rounded-md"
          >
            <div class="w-8 sm:w-16 shrink-0">
              <img :src="user.avatar" alt="image" class="size-8 rounded-full" />
            </div>
            <div class="flex-1 font-montserrat-medium">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <div
              :class="[
                'shrink-0 flex items-center md:pr-10 gap-0 sm:gap-1 text-light-3 ',
                '*:size-8 *:flex *:justify-center *:items-center *:rounded-md'
              ]"
            >
              <button class="hover:bg-transparent-dark-1" @click="handleUserEdit(user.id)">
                <PencilSquareIcon class="size-4" />
              </button>
              <button class="hover:bg-transparent-dark-1" @click="handleUserDelete(user.id)">
                <TrashIcon class="size-4" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <Pagination
      :visible="!!(!!UsersFiltered && UserStore.pagesCount > -1)"
      :totalPages="UserStore.pagesCount"
      :currentPage="UserStore.currentPage"
      :visibleButtons="VISIBLE_PAGINATION_BUTTONS"
      @onPageChange="UserStore.setData"
    />
  </main>
</template>
