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
        teammates
        voteClosed
        }
    }
`

export const ADD_PERSONAL_VOTE = gql`
    mutation addPersonalVote($createPersonalVoteInput: CreatePersonalVoteInput!) {
        addPersonalVote(createPersonalVoteInput: $createPersonalVoteInput) {
        id
        voteId
        loser
        comments
        personalVotes{
            mvp
            mvpComment
            loser
            loserComment
            }
        teammates
        voteClosed
        }
    }
`

export const ADD_TEAMMATES = gql`
    mutation addTeammates($voteId: String!, $teammates: Int!) {
        addTeammates(voteId: $voteId, teammates: $teammates) {
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
        teammates
        voteClosed
        }
    }
`

export const CLOSE_VOTE = gql`
    mutation closeVote($voteId: String!) {
        closeVote(voteId: $voteId) {
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
        teammates
        voteClosed
        }
    }
`