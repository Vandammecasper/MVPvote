<script setup lang="ts">
import router from '@/bootstrap/router';
import { VOTE_BY_VOTE_ID } from '@/graphql/vote.query';
import { CLOSE_VOTE } from '@/graphql/vote.mutation';
import { useMutation, useQuery } from '@vue/apollo-composable';


const { result: voteByVoteIdResult } = useQuery(VOTE_BY_VOTE_ID, {
    voteId: router.currentRoute.value.params.code
})

const { mutate: closeVoteMutation } = useMutation(CLOSE_VOTE)

let remainingVoters = voteByVoteIdResult.value?.vote?.personalVotes.length()
const voteId = router.currentRoute.value.params.code

console.log(remainingVoters)

const finishVoting = () => {
    closeVoteMutation({
        voteId: router.currentRoute.value.params.code
    })
    .then(() => {
        router.push(`/creator/reading/created/${voteId}`)
    })
}

</script>

<template>
  <div className="bg-primary w-screen h-screen px-8 flex flex-col items-center">
    <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
    <h1 className="font-gill text-secondary text-center text-3xl mt-2">Your teammates are voting</h1>
    <div className="mt-48">
        <h2 className="font-gill text-secondary text-center text-3xl">Have voted:</h2>
        <p className="font-gill text-secondary text-center text-4xl mt-4">{{voteByVoteIdResult.voteByVoteId.personalVotes.length}}</p>
    </div>
    <p className="font-gill text-secondary text-xs fixed bottom-24">reload this page to update the number</p>
    <!-- <div v-else className="mt-48 grid justify-items-center gap-8">
        <h2 className="font-gill text-secondary text-center text-3xl">Everyone has voted</h2>
        <img src="/voted.svg" alt="">
    </div> -->
    <!-- <div className="mt-48 grid justify-items-center gap-8">
        <h2 className="font-gill text-secondary text-center text-3xl">Ask whether everyone has voted</h2>
        <img src="/voted.svg" alt="">
    </div> -->
    <!-- <button @click="() => finishVoting()" v-if="remainingVoters > 0" className="justify-self-center text-secondary border-4 border-secondary text-3xl font-gill fixed bottom-0 w-screen py-4">Finish voting</button> -->
    <button @click="() => finishVoting()" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">Go to results</button>
  </div>
</template>
