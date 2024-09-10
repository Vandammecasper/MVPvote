<script setup lang="ts">
</script>

<template>
  <div className="bg-primary w-screen h-screen grid content-center justify-items-center overflow-hidden">
    <button className="bg-primary text-secondary border-4 p-2 w-40 text-2xl font-gill rounded-xl top-6 right-6 absolute">Log in</button>
    <img src="/logo_noBackground.png" alt="" className="h-52"/>
    <h1 className="text-secondary text-4xl mt-4 font-gill font-normal">Vote</h1>
    <RouterLink to="/creator/create">
      <button className="bg-secondary text-primary p-2 w-56 text-2xl font-gill rounded-xl mt-24">Create a new vote</button>
    </RouterLink>
    <RouterLink to="/join">
      <button className="bg-secondary text-primary p-2 w-56 text-2xl font-gill rounded-xl mt-6">Join vote</button>
    </RouterLink>
    <!-- <button className="bg-primary text-secondary border-4 p-2 w-56 text-2xl font-gill rounded-xl mt-6">My votes</button> -->
  </div>
</template>
