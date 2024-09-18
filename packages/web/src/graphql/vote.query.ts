import gql from 'graphql-tag'

export const VOTE_BY_VOTE_ID = gql`
    query voteByVoteId($voteId: String!) {
        voteByVoteId(voteId: $voteId) {
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