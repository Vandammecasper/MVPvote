<script setup lang="ts">
import router from '@/bootstrap/router';
import { VOTE_BY_VOTE_ID } from '@/graphql/vote.query';
import { useQuery } from '@vue/apollo-composable';
import { ref } from 'vue';

const voteId = router.currentRoute.value.params.code;

const { result: voteByVoteIdResult } = useQuery(VOTE_BY_VOTE_ID, {
    voteId: voteId
});


const currentTopCard = ref(voteByVoteIdResult.value.voteByVoteId?.personalVotes.length - 1); // Track the index of the current top card
const isAnimating = ref(false); // To track if the animation is ongoing

// Function to move to the next vote
const nextVote = () => {
  if (!isAnimating.value && currentTopCard.value < (voteByVoteIdResult.value?.voteByVoteId?.personalVotes.length || 0) + 1) {
    isAnimating.value = true; // Prevent multiple animations from triggering at once
    setTimeout(() => {
      currentTopCard.value--; // Move to the next card after animation
      isAnimating.value = false; // Allow next animation
    }, 500); // Set timeout to match the duration of the fly-out animation
  }
};

// Function to move to the previous vote
const previousVote = () => {
  if (!isAnimating.value && currentTopCard.value < (voteByVoteIdResult.value?.voteByVoteId?.personalVotes.length || 0) - 1 && currentTopCard.value >= 0) {
      currentTopCard.value++; // Move to the previous card after animation
  }
};
</script>

<template>
  <div class="bg-primary w-screen h-screen px-8 flex flex-col items-center">
    <img src="/logo_noBackground.png" alt="" class="h-28 mt-4"/>
    <h1 class="font-gill text-secondary text-center text-3xl mt-2">Voting results</h1>

    <!-- Cards -->
    <div class="relative w-full h-full flex justify-center items-start">
      <transition-group name="card" tag="div">
        <div v-for="(vote, index) in voteByVoteIdResult?.voteByVoteId?.personalVotes" 
             :key="index"
             v-show="index <= currentTopCard" 
             class="bg-secondary h-100 mx-8 py-4 px-6 absolute drop-shadow-xl" 
             :style="{ 
               left: '42%', 
               top: `calc(3% - ${(index - currentTopCard) * 10}px)`, 
               transform: index === currentTopCard && isAnimating 
                           ? 'translateX(150%)' // Fly out to the right for the current top card
                           : 'translateX(-50%)',  // Keep the remaining cards centered
               transition: index === currentTopCard && isAnimating 
                           ? 'transform 0.5s ease-out' 
                           : 'none'
             }">
          <h2 class="text-xl font-gill font-bold">MVP: {{vote.mvp}}</h2>
          <p class="font-gill mt-2 h-40 overflow-auto">{{vote.mvpComment}}</p>
          <div class="bg-primary h-1 w-72 mt-2"></div>
          <h2 class="text-xl font-gill font-bold mt-4">Loser: {{vote.loser}}</h2>
          <p class="font-gill mt-2 h-40 overflow-auto">{{vote.loserComment}}</p>
        </div>
      </transition-group>
    </div>

    <!-- Buttons -->
    <div class="fixed bottom-4 w-full h-20 flex justify-between">
      <button class="text-xl border-4 bg-primary border-secondary text-secondary font-gill w-2/5 ml-6" @click="previousVote">Previous vote</button>
      <button v-if="currentTopCard >= 1" class="text-xl bg-secondary font-gill w-2/5 mr-6" @click="nextVote">Next vote</button>
      <button v-else class="text-xl bg-secondary font-gill w-2/5 mr-6" @click="() => router.push(`/creator/results/${voteId}`)">Go to ranking</button>
    </div>
  </div>
</template>

<style scoped>
.card-enter-active, .card-leave-active {
  transition: transform 0.5s ease-out;
}

.card-leave-to {
  transform: translateX(150%); /* Fly out to the right */
}
</style>
