<script setup lang="ts">
import router from '@/bootstrap/router';
import { VOTE_BY_VOTE_ID } from '@/graphql/vote.query';
import { ADD_PERSONAL_VOTE } from '@/graphql/vote.mutation';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';

const voteId = router.currentRoute.value.params.code
const mvpName = ref('');
const mvpComment = ref('');
const loserName = ref('');
const loserComment = ref('');
const mvpNameError = ref(false)
const mvpCommentError = ref(false)
const loserNameError = ref(false)
const loserCommentError = ref(false)
const origin = router.currentRoute.value.params.origin

const { result: voteByVoteIdResult } = useQuery(VOTE_BY_VOTE_ID, {
    voteId: voteId
})

const { mutate: addPersonalVoteMutation } = useMutation(ADD_PERSONAL_VOTE)


const sendVote = () => {
    // Reset errors
    mvpNameError.value = false;
    mvpCommentError.value = false;
    loserNameError.value = false;
    loserCommentError.value = false;

    // Fetch the conditions
    const isLoserRequired = voteByVoteIdResult.value.voteByVoteId.loser;
    const isCommentRequired = voteByVoteIdResult.value.voteByVoteId.comments;

    // Validation flags
    let isValid = true;

    // Validate mvpName (always required)
    if (!mvpName.value.trim()) {
        mvpNameError.value = true;
        isValid = false;
    }

    // Validate mvpComment if required
    if (isCommentRequired && !mvpComment.value.trim()) {
        mvpCommentError.value = true;
        isValid = false;
    }

    // Validate loserName if required
    if (isLoserRequired && !loserName.value.trim()) {
        loserNameError.value = true;
        isValid = false;
    }

    // Validate loserComment if both loser and comments are required
    if (isLoserRequired && isCommentRequired && !loserComment.value.trim()) {
        loserCommentError.value = true;
        isValid = false;
    }

    // If all validations pass, proceed with the mutation
    if (isValid) {
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
                router.push(`/creator/remaining/created/${voteId}`);
            } else if (origin === 'joined') {
                router.push('/thankyou');
            }
        });
    }
    console.log(mvpNameError.value, mvpCommentError.value, loserNameError.value, loserCommentError.value)
}

</script>

<template>
  <div className="bg-primary w-screen min-h-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-4xl mt-4">Your vote</h1>
    </div>
    <div v-if="voteByVoteIdResult" className="w-screen flex flex-col items-center mt-8 mb-32">
        <div>
            <p className="font-gill text-secondary text-xl">Your MVP of the match</p>
            <input 
                v-model="mvpName" 
                type="text" 
                :class="['w-72 h-9 rounded-xl mt-2 px-3', mvpNameError ? 'border-red border-3' : '']" 
                placeholder="Name of the match MVP" 
            />
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.comments" className="mt-4">
            <p className="font-gill text-secondary text-xl">MVP comment</p>
            <textarea v-model="mvpComment" :class="['w-72 h-28 rounded-xl mt-2 px-3 p-2', mvpCommentError ? 'border-red border-3' : '']" placeholder="Name of the match MVP"></textarea>
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.loser" className="mt-6">
            <p className="font-gill text-secondary text-xl">Your loser of the match</p>
            <input v-model="loserName" type="text" :class="['w-72 h-9 rounded-xl mt-2 px-3', loserNameError ? 'border-red border-3' : '']"  placeholder="Name of the match MVP">
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId.loser && voteByVoteIdResult.voteByVoteId.comments" className="mt-4">
            <p className="font-gill text-secondary text-xl">Loser comment</p>
            <textarea v-model="loserComment" :class="['w-72 h-28 rounded-xl mt-2 px-3 p-2', loserCommentError ? 'border-red border-3' : '']" placeholder="Name of the match MVP"></textarea>
        </div>
    </div>
    <button @click="sendVote" v-if="voteByVoteIdResult" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">Send vote</button>
    <div v-else className="flex flex-col min-h-screen">
        <h1 className="font-gill text-secondary text-center text-4xl mt-48">Couldn't find your vote</h1>
        <RouterLink to="/" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">
            <p>Back to homescreen</p>
        </RouterLink>
    </div>
  </div>
</template>