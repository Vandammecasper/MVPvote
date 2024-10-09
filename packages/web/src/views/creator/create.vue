<script setup lang="ts">
import router from '@/bootstrap/router'
import { CREATE_VOTE } from '@/graphql/vote.mutation';
import { useMutation } from '@vue/apollo-composable';
import useFirebase from '@/composables/useFirebase';

const { mutate: createVoteMutation } = useMutation(CREATE_VOTE)

  const { firebaseUser } = useFirebase()

  let randomCode:string
  let loser:boolean = false
  let comments:boolean = false

  const generateRandomCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < 20; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    randomCode = result

    return randomCode;
  }

  const handleCreateVote = () => {
    generateRandomCode()
    createVoteMutation({
        createVoteInput: {
            voteId: randomCode,
            creatorUid: firebaseUser.value?.uid,
            loser: loser,
            comments: comments
        }
    })
    .then(() => {
        router.push({ path: `/creator/qr/${randomCode}` })
    })
    .catch((error) => {
        console.error(error)
    })
  }
</script>

<template>
  <div className="bg-primary w-screen h-screen flex flex-col justify-start items-center">
    <div className="flex flex-col items-center">
      <img src="/logo_noBackground.png" alt="" className="h-28 mt-4"/>
      <h1 className="font-gill text-secondary text-4xl mt-2">Create a new vote</h1>
    </div>
    <div className="mt-20">
      <div className="flex w-screen px-16 justify-between items-center">
        <p className="font-gill text-secondary text-2xl mt-2">Loser of the match</p>
        <input type="checkbox" v-model="loser" style="width: 25px; height: 25px;" className="mt-2">
      </div>
      <div className="flex w-screen px-16 justify-between items-center mt-4">
        <p className="font-gill text-secondary text-2xl mt-2">Comments</p>
        <input type="checkbox" v-model="comments" style="width: 25px; height: 25px;" className="mt-2">
      </div>
      <p className="font-gill text-secondary ml-16 pr-32 opacity-45">Add some funny comments to explain your vote!</p>
    </div>
    <button @click="handleCreateVote" className="bg-accent justify-self-center text-secondary text-2xl font-gill py-2 w-56 text-center rounded-lg fixed bottom-12">Create vote</button>
  </div>
</template>