<script setup lang="ts">
import router from '@/bootstrap/router';
import { ADD_TEAMMATES } from '@/graphql/vote.mutation';
import { useMutation } from '@vue/apollo-composable';
import QrcodeVue from 'qrcode.vue'

const {  mutate: addTeammatesMutation } = useMutation(ADD_TEAMMATES)

const code = router.currentRoute.value.params.code
const link = `https://mvpvote.vercel.app/vote/joined/${code}`

const handleStartVote = () => {
  addTeammatesMutation({
    voteId: code,
    teammates: 0
  })
  .then(() => {
    router.push(`/creator/vote/created/${code}`)
  })
  .catch(() => {
    console.error('error')
  })
}
</script>

<template >
  <div className="bg-primary min-h-screen w-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">Let your teammates scan the QR-code to start</h1>
    </div>
    <div class="bg-secondary p-2 mt-16 mb-16">
        <qrcode-vue :value="link" :size="250" />
    </div>
    <!-- <p className="font-gill text-secondary text-center text-3xl mt-8">Teammates joined:</p>
    <p className="font-gill text-secondary text-center text-4xl mt-2 mb-24">0</p> -->
    <button @click="handleStartVote" className="bg-accent justify-self-center text-secondary text-2xl font-gill py-2 px-12 rounded-lg mb-24">Start voting</button>
  </div>
</template>