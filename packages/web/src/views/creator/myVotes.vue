<script setup lang="ts">
import router from '@/bootstrap/router';
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { VOTES_BY_CREATOR_UID } from '@/graphql/vote.query';

interface Vote {
    voteId: string;
    creatorUid: string;
    date: string;
    loser: boolean;
    comments: boolean;
    personalVotes: {
        mvp: string;
        loser: string;
    }[];
}

const { firebaseUser } = useFirebase();
const { result: votesByCreatorIdResult } = useQuery(VOTES_BY_CREATOR_UID, {
    uid: firebaseUser.value?.uid
});

const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Invalid date");
    }

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'numeric', year: 'numeric'
    });

    return formattedDate;
}

const findMVP = (givenVote:Vote) => {
    let mvpVotes = [];
    let voteCounts: { [key: string]: number } = {};

    // Iterate through each vote
    for (const vote of givenVote.personalVotes) {
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

const findLoser = (givenVote:Vote) => {
    let loserVotes = [];
    let voteCounts: { [key: string]: number } = {};

    // Iterate through each vote
    for (const vote of givenVote.personalVotes) {
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

</script>

<template >
  <div className="bg-primary min-h-screen w-screen px-8 flex flex-col items-center">
    <div className="flex flex-col items-center mb-6">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-center text-3xl mt-2">My votes</h1>
    </div>
    <div @click="router.push(`/creator/results/${vote.voteId}`)" v-for="vote of votesByCreatorIdResult?.votesByCreatorUid" className="bg-secondary w-full px-4 py-2 rounded-xl mt-4">
        <div className="flex justify-between items-center">
            <h1 className="font-gill font-bold text-2xl">{{formatDate(vote.date)}}</h1>
            <p>more info ></p>
        </div>
        <div className="flex justify-between mt-4 font-gill">
            <p v-if="vote.mvp" className="border-2 p-1.5 px-4 border-blue rounded-xl">{{findMVP(vote)[0].name}}</p>
            <p v-if="vote.loser" className="border-2 p-1.5 px-4 border-red rounded-xl">{{findLoser(vote)[0].name}}</p>
        </div>
    </div>
    <button @click="router.push('/')" className="bg-secondary justify-self-center text-primary text-3xl font-gill fixed bottom-0 w-screen py-4">Go back to homepage</button>
  </div>
</template>