<script setup lang="ts">
import router from '@/bootstrap/router';
import { VOTE_BY_VOTE_ID } from '@/graphql/vote.query';
import { ADD_PERSONAL_VOTE } from '@/graphql/vote.mutation';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';

const { result: voteByVoteIdResult } = useQuery(VOTE_BY_VOTE_ID, {
    voteId: router.currentRoute.value.params.code
})

const { mutate: addPersonalVoteMutation } = useMutation(ADD_PERSONAL_VOTE)

console.log(voteByVoteIdResult)

const mvpName = ref('');
const mvpComment = ref('');
const loserName = ref('');
const loserComment = ref('');
const voteId = router.currentRoute.value.params.code
const origin = router.currentRoute.value.params.origin

const sendVote = () => {
    console.log('send vote')
    console.log(mvpName.value)
    console.log(mvpComment.value)
    console.log(loserName.value)
    console.log(loserComment.value)
    addPersonalVoteMutation({
        createPersonalVoteInput: {
            voteId: voteId,
            mvp: mvpName.value,
            mvpComment: mvpComment.value,
            loser: loserName.value,
            loserComment: loserComment.value
        }
    })
    .then(() => {
        console.log('vote sent')
        console.log(origin)
        if (origin === 'created') {
            router.push(`/creator/remaining/created/${voteId}`)
        } else if (origin === 'joined') {
            console.log('redirect to waiting screen')
        }
    })
}

</script>

<template>
  <div className="bg-primary w-screen h-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-4xl mt-4">Your vote</h1>
    </div>
    <div v-if="voteByVoteIdResult" className="h-screen w-screen flex flex-col items-center justify-center -mt-28">
        <div>
            <p className="font-gill text-secondary text-xl">Your MVP of the match</p>
            <input v-model="mvpName" type="text" className="w-72 h-9 rounded-xl mt-2 px-3" placeholder="Name of the match MVP">
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.comments" className="mt-4">
            <p className="font-gill text-secondary text-xl">MVP comment</p>
            <textarea v-model="mvpComment" className="w-72 h-28 rounded-xl mt-2 px-3 p-2" placeholder="Name of the match MVP"></textarea>
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.loser" className="mt-6">
            <p className="font-gill text-secondary text-xl">Your loser of the match</p>
            <input v-model="loserName" type="text" className="w-72 h-9 rounded-xl mt-2 px-3" placeholder="Name of the match MVP">
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.loser && voteByVoteIdResult.voteByVoteId.comments" className="mt-4">
            <p className="font-gill text-secondary text-xl">Loser comment</p>
            <textarea v-model="loserComment" className="w-72 h-28 rounded-xl mt-2 px-3 p-2" placeholder="Name of the match MVP"></textarea>
        </div>
    </div>
    <button @click="sendVote" v-if="voteByVoteIdResult" className="bg-secondary text-primary w-56 text-2xl font-gill rounded-xl absolute bottom-16 p-2">Send vote</button>
    <div v-else className="flex flex-col">
        <h1 className="font-gill text-secondary text-center text-4xl mt-48">Couldn't find your vote</h1>
        <RouterLink to="/" className="bg-secondary text-primary w-60 text-2xl text-center font-gill rounded-xl absolute bottom-16 p-2 self-center">
            <p>Back to homescreen</p>
        </RouterLink>
    </div>
  </div>
</template>