<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router'

import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { useUsersStore } from '@/stores/users'
import router from '@/router'
import { getUser, type User } from '@/lib/regresApi'

const props = defineProps({
  updateMode: {
    type: Boolean,
    required: false,
    default: false
  }
})
const routeQuery = useRoute()
const userId = routeQuery.query.id

const UserStore = useUsersStore()

const userData = ref(<User>{})
const imageUrl = ref(<string | null>null)
const isPending = ref(false)

onMounted(async () => {
  if (props.updateMode && userId) {
    try {
      const { data } = await getUser(String(userId))
      userData.value.first_name = data.first_name
      userData.value.last_name = data.last_name
      userData.value.avatar = data.avatar
      imageUrl.value = data.avatar
    } catch (error) {
      console.error(error)
    }
  }
})

const uploadImage = () => {
  if (userData.value.avatar !== '') imageUrl.value = userData.value.avatar
}

const handleInputChange = (inputValue: string, inputName: string) => {
  userData.value[inputName] = inputValue
}

const handleSubmit = async (_ev: any) => {
  _ev.preventDefault()
  if (!isPending.value) {
    isPending.value = true
    await UserStore.createUser(userData.value)
    router.push('/')
    isPending.value = false
  }
}
</script>

<template>
  <main class="view-vertical view-horizontal flex flex-col gap-3">
    <h1>{{ updateMode ? 'Update' : 'Add' }} user</h1>
    <form
      class="h-fit flex max-sm:flex-col-reverse max-sm:justify-end gap-4"
      @submit="handleSubmit"
    >
      <div class="sm:flex-1 flex flex-col justify-between bg-white border rounded-md p-6 gap-4">
        <div class="w-full flex flex-wrap gap-4 grow-0 shrink">
          <Input
            :specValue="userData.first_name"
            name="first_name"
            title="First name"
            required
            minlength="2"
            @onChange="handleInputChange"
          />
          <Input
            :specValue="userData.last_name"
            name="last_name"
            title="Last name"
            required
            minlength="2"
            @onChange="handleInputChange"
          />
        </div>
        <Button type="submit" :loading="isPending">
          {{ updateMode ? 'Update Details' : 'Save user' }}
        </Button>
      </div>
      <div
        class="sm:w-fit sm:min-w-72 h-fit flex flex-col items-center bg-white border rounded-md p-6 gap-4"
      >
        <div class="w-full max-w-32 aspect-square rounded-full overflow-hidden bg-light-1">
          <img v-if="!!imageUrl" alt="image" class="w-full h-full" :src="imageUrl" />
        </div>
        <Input
          class="w-full"
          title="Paste image url"
          placeholder="https//pexels.com/123.png"
          name="avatar"
          :specValue="userData.avatar"
          @onChange="handleInputChange"
        >
        </Input>
        <Button class="w-full" variant="outline" @click="uploadImage">
          <PhotoIcon class="size-4 shrink-0 -ml-1" />
          {{ updateMode ? 'Change Photo' : 'Add image' }}
        </Button>
      </div>
    </form>
  </main>
</template>
