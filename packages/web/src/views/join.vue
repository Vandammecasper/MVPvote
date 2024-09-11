<script setup lang="ts">
import router from '@/bootstrap/router';
import { QrcodeStream } from 'vue-qrcode-reader';

interface detectedCode {
    rawValue: string
}

let voteId:string

const onDetect = (detectedCodes: Array<detectedCode>) => {
    voteId = detectedCodes[0].rawValue
    router.push({ path: `/vote/joined/${voteId}` })
}
</script>

<template>
  <div className="bg-primary w-screen h-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">Scan the QR-code to join the vote</h1>
    </div>
    <div className="mt-16 h-80 w-72">
        <qrcode-stream @detect="onDetect"></qrcode-stream>
    </div>
    <button className="bg-secondary text-primary w-56 text-2xl font-gill rounded-xl absolute bottom-16 p-2">Start voting</button>
  </div>
</template>