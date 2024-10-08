<script lang="ts">

import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '../../composables/useFirebase'
import router from '@/bootstrap/router'

export default {
  setup() { 
    const { register } = useFirebase()

    const newUser = ref({
      name: '',
      password: '',
      email: '',
    })
    const error = ref<AuthError | null>(null)


    const handleRegister = () => {
      register(newUser.value.name, newUser.value.email, newUser.value.password)
      .then(() => {
        router.push('/')
      })
      .catch((err) => {
        console.error(err)
        error.value = err
      })
    }

    return {
      error,
      newUser,
      handleRegister,
    }
  }
}
</script>


<template>
  <form @submit.prevent="handleRegister" class="w-screen h-screen grid">
    <div class="grid bg-secondary p-4 place-self-center rounded-xl drop-shadow-xl">
      <RouterLink to="/" class="justify-self-end">
        <img src="/no.svg" alt="" class="w-7">
      </RouterLink>
      <div class="py-1 sm:py-4 px-6 sm:px-16 grid">
        <h1 class="text-3xl sm:text-4xl tracking-wider justify-self-center text-darkGreen font-bold font-gill">REGISTER</h1>

        <div v-if="error">
          <p class="text-red font-gill font-bold">{{ error }}</p>
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="nickname"
            class="text-md block font-bold text-darkGreen font-gill"
          >
            Last name
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Your last name"
            class="font-gill text-darkGreen rounded-2xl mt-1 block border-2 bg-lightGreen border-darkGreen p-2 "
            v-model="newUser.name"
            />
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="email"
            class="text-md block font-bold tracking-wider  text-darkGreen font-gill"
          >
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="youremail@example.com"
            class="font-gill text-darkGreen rounded-2xl mt-1 block border-2 bg-lightGreen border-darkGreen p-2 "
            v-model="newUser.email"
          />
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="password"
            class="text-md block font-bold tracking-wider  text-darkGreen font-gill"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            class="font-gill text-darkGreen rounded-2xl mt-1 block border-2 bg-lightGreen border-darkGreen p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.password"
            />
        </div>

        <button
          class="font-gill rounded-xl mt-6 w-full bg-accent py-2 px-4 font-bold  text-secondary"
        >
          Register
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="font-gill mt-4 inline-block text-sm text-darkGreen"
            to="/auth/login"
          >
           Already have an account? <span class="underline text-accent font-gill font-bold">Log in</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </form>
</template>
