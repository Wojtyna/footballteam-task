<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { PhotoIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { useUsersStore } from '@/stores/users'
import router from '@/router'
import { getUser } from '@/lib/regresApi'

const INPUT_FIRST_NAME = 'first name'
const INPUT_LAST_NAME = 'last name'
const INPUT_IMAGE_URL = 'image url'

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

const userData = ref({
  [INPUT_FIRST_NAME]: '',
  [INPUT_LAST_NAME]: '',
  [INPUT_IMAGE_URL]: ''
})
const imageUrl = ref(null)
const isPending = ref(false)

onMounted(async () => {
  if (props.updateMode && userId) {
    const { error, data } = await getUser(userId)
    if (!error) {
      userData.value[INPUT_FIRST_NAME] = data.first_name
      userData.value[INPUT_LAST_NAME] = data.last_name
      userData.value[INPUT_IMAGE_URL] = data.avatar
      imageUrl.value = data.avatar
    }
  }
})

const uploadImage = () => {
  imageUrl.value = userData.value[INPUT_IMAGE_URL]
}

const handleInputChange = (inputValue, inputName) => {
  userData.value[inputName] = inputValue
}
const handleSubmitPress = async () => {
  if (!isPending.value) {
    isPending.value = true
    await UserStore.createUser(toRaw(userData.value))
    router.push('/')
    isPending.value = false
  }
}
</script>

<template>
  <main class="view-vertical view-horizontal flex flex-col gap-3">
    <h1>{{ updateMode ? 'Update' : 'Add' }} user</h1>
    <div class="h-fit flex max-sm:flex-col-reverse max-sm:justify-end gap-4">
      <div class="sm:flex-1 flex flex-col justify-between bg-white border rounded-md p-6 gap-4">
        <div class="w-full flex flex-wrap gap-4 grow-0 shrink">
          <Input
            :specValue="userData[INPUT_FIRST_NAME]"
            :name="INPUT_FIRST_NAME"
            title="First name"
            @onChange="handleInputChange"
          />
          <Input
            :specValue="userData[INPUT_LAST_NAME]"
            :name="INPUT_LAST_NAME"
            title="Last name"
            @onChange="handleInputChange"
          />
        </div>
        <Button :disabled="isPending" @click="handleSubmitPress"
          >{{ updateMode ? 'Update Details' : 'Save user' }}
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
          :name="INPUT_IMAGE_URL"
          :specValue="userData[INPUT_IMAGE_URL]"
          @onChange="handleInputChange"
        >
        </Input>
        <Button class="w-full" variant="outline" @click="uploadImage">
          <PhotoIcon class="size-4 shrink-0 -ml-1" />
          {{ updateMode ? 'Change Photo' : 'Add image' }}
        </Button>
      </div>
    </div>
  </main>
</template>
