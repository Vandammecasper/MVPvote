<script setup lang="ts">
import router from '@/bootstrap/router';
import { newtonsCradle } from 'ldrs'

newtonsCradle.register()

</script>

<template >
  <div className="bg-primary min-h-screen w-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">Thank you for voting</h1>
    </div>
    <div className="mt-48 grid justify-items-center gap-8">
        <h2 className="font-gill text-secondary text-center text-4xl">Your vote has been successfully received!</h2>
    </div>
    <!-- <l-newtons-cradle
    size="150"
    speed="1.4"
    color="rgba(40, 150, 90)"
    className="absolute bottom-32"
    ></l-newtons-cradle> -->
    <button @click="router.push('/')" className="bg-accent justify-self-center text-secondary text-2xl font-gill py-3 w-72 text-center rounded-lg fixed bottom-12">Go back to homepage</button>
  </div>
</template>