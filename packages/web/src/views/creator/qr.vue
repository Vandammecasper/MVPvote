<script setup lang="ts">
import router from '@/bootstrap/router';
import QrcodeVue from 'qrcode.vue'

const code = router.currentRoute.value.params.code
</script>

<template>
  <div className="bg-primary w-screen h-screen px-8 flex flex-col items-center mb-16">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">Let your teammates scan the QR-code to start</h1>
    </div>
    <div class="bg-secondary p-2 mt-16">
        <qrcode-vue :value="Array.isArray(code) ? code[0] : code || ''" :size="250" />
    </div>
    <p className="font-gill text-secondary text-center text-3xl mt-8">Teammates joined:</p>
    <p className="font-gill text-secondary text-center text-4xl mt-2">0</p>
    <button className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">Start voting</button>
  </div>
</template>