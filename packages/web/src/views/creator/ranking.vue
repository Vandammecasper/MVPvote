<script setup lang="ts">
import router from '@/bootstrap/router';
import { VOTE_BY_VOTE_ID } from '@/graphql/vote.query';
import { useQuery } from '@vue/apollo-composable';

const voteId = router.currentRoute.value.params.code;

const { result: voteByVoteIdResult } = useQuery(VOTE_BY_VOTE_ID, {
    voteId: voteId
});

const findMVP = () => {
    let mvpVotes = [];
    let voteCounts: { [key: string]: number } = {};

    // Iterate through each vote
    for (const vote of voteByVoteIdResult.value.voteByVoteId?.personalVotes) {
        // Get the name of the MVP from the vote and capitalise it
        let mvpName:string = vote.mvp.toUpperCase();

        // Update the vote count for this MVP
        if (voteCounts[mvpName]) {
            voteCounts[mvpName]++;
        } else {
            voteCounts[mvpName] = 1;
        }
    }

    // Convert the voteCounts object to an array of objects
    mvpVotes = Object.keys(voteCounts).map(name => ({
        name: name,
        votes: voteCounts[name]
    }));

    //get the mvp with the most votes
    mvpVotes.sort((a, b) => b.votes - a.votes);

    return mvpVotes;
};

const findLoser = () => {
    let loserVotes = [];
    let voteCounts: { [key: string]: number } = {};

    // Iterate through each vote
    for (const vote of voteByVoteIdResult.value.voteByVoteId?.personalVotes) {
        // Get the name of the MVP from the vote and capitalise it
        let loserName = vote.loser.toUpperCase();

        // Update the vote count for this MVP
        if (voteCounts[loserName]) {
            voteCounts[loserName]++;
        } else {
            voteCounts[loserName] = 1;
        }
    }

    // Convert the voteCounts object to an array of objects
    loserVotes = Object.keys(voteCounts).map(name => ({
        name: name,
        votes: voteCounts[name]
    }));

    //get the mvp with the most votes
    loserVotes.sort((a, b) => b.votes - a.votes);

    return loserVotes;
};

const limitString = (string: string): string => {
    if (string.length > 11) {
        return string.slice(0, 10) + '...';
    }
    return string;
};


</script>

<template >
  <div className="bg-primary min-h-screen w-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">Voting results</h1>
    </div>
    <div className="mt-4 flex gap-4 mb-8">
        <div className="bg-blue h-100 w-40 py-4 px-2 text-center rounded-lg overflow-y-visible">
            <h2 className="font-gill font-bold text-secondary text-2xl">MVP</h2>
            <div className="border-4 border-secondary rounded-2xl w-full px-2 py-1 mt-2 mb-4">
                <div className="flex flex-col justify-center">
                    <h3 className="font-gill text-secondary text-xl">{{limitString(findMVP()[0].name)}}</h3>
                    <p className="font-gill text-secondary text-sm opacity-80">{{findMVP()[0].votes}} votes</p>
                </div>
            </div>
            <div v-for="(mvp, index) in findMVP()" :key="index" v-show="index > 0" className="flex flex-col w-full items-center px-1">
                <div className="flex w-full text-sm text-secondary justify-between font-gill">
                    <div className="flex gap-1">
                       <p>{{index + 1}}.</p>
                        <p>{{ limitString(mvp.name) }}</p> 
                    </div>
                    <p>{{ mvp.votes }}</p>
                </div>
                <div className="bg-secondary w-5/6 h-0.5 mt-1"></div>
            </div>
        </div>
        <div v-if="voteByVoteIdResult.voteByVoteId?.loser === true" className="bg-red h-100 w-40 py-4 px-2 text-center rounded-lg overflow-y-visible">
            <h2 className="font-gill font-bold text-secondary text-2xl">LOSER</h2>
            <div className="border-4 border-secondary rounded-2xl w-full px-2 py-1 mt-2 mb-4">
                <div className="flex flex-col justify-center">
                    <h3 className="font-gill text-secondary text-xl">{{limitString(findLoser()[0].name)}}</h3>
                    <p className="font-gill text-secondary text-sm opacity-80">{{findLoser()[0].votes}} votes</p>
                </div>
            </div>
            <div v-for="(loser, index) in findLoser()" :key="index" v-show="index > 0" className="flex flex-col w-full items-center px-1">
                <div className="flex w-full text-sm text-secondary justify-between font-gill">
                    <div className="flex gap-1">
                       <p>{{index + 1}}.</p>
                        <p>{{ limitString(loser.name) }}</p> 
                    </div>
                    <p>{{ loser.votes }}</p>
                </div>
                <div className="bg-secondary w-5/6 h-0.5 mt-1"></div>
            </div>
        </div>
    </div>
    <button @click="router.push('/')" className="bg-accent justify-self-center text-secondary text-2xl font-gill py-2 px-8 rounded-lg mb-24">Go back to homepage</button>
  </div>
</template>