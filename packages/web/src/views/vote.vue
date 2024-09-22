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

const mvpName = ref('');
const mvpComment = ref('');
const loserName = ref('');
const loserComment = ref('');
const voteId = router.currentRoute.value.params.code
const origin = router.currentRoute.value.params.origin

const sendVote = () => {
    addPersonalVoteMutation({
        createPersonalVoteInput: {
            voteId: voteId,
            mvp: mvpName.value.replace(/\s+/g, '').toUpperCase(),
            mvpComment: mvpComment.value,
            loser: loserName.value.replace(/\s+/g, '').toUpperCase(),
            loserComment: loserComment.value
        }
    })
    .then(() => {
        if (origin === 'created') {
            router.push(`/creator/remaining/created/${voteId}`)
        } else if (origin === 'joined') {
            router.push('/thankyou')
        }
    })
}

</script>

<template>
  <div className="bg-primary w-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-4xl mt-4">Your vote</h1>
    </div>
    <div v-if="voteByVoteIdResult" className="w-screen flex flex-col items-center mt-8 mb-32">
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
    <button @click="sendVote" v-if="voteByVoteIdResult" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">Send vote</button>
    <div v-else className="flex flex-col">
        <h1 className="font-gill text-secondary text-center text-4xl mt-48">Couldn't find your vote</h1>
        <RouterLink to="/" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">
            <p>Back to homescreen</p>
        </RouterLink>
    </div>
  </div>
</template>