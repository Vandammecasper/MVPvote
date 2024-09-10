import gql from 'graphql-tag'

export const CREATE_VOTE = gql`
    mutation createVote($createVoteInput: CreateVoteInput!) {
        createVote(createVoteInput: $createVoteInput) {
        voteId
        creatorUid
        date
        loser
        comments
        personalVotes{
            mvp
            mvpComment
            loser
            loserComment
            }
        }
    }
`