import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { CreatePersonalVoteInput } from './dto/create-personal-vote.input';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Vote, { description: 'Create a new vote' })
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput): Promise<Vote> {
    return this.voteService.create(createVoteInput);
  }

  @Mutation(() => Vote, { description: 'Add personal vote to vote' })
  addPersonalVote(@Args('createPersonalVoteInput') personalVoteInput: CreatePersonalVoteInput): Promise<Vote> {
    return this.voteService.addPersonalVote(personalVoteInput);
  }

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.voteService.findAll();
  }

  @Query(() => [Vote], { name: 'votesByCreatorUid' })
  votesByCreatorUid(@Args('uid', { type: () => String }) uid: string) {
    return this.voteService.findByCreatorUid(uid);
  }

  @Query(() => Vote, { name: 'voteByVoteId' })
  findByVoteId(@Args('voteId', { type: () => String }) voteId: string) {
    return this.voteService.findByVoteId(voteId);
  }

  @Mutation(() => Vote)
  updateVote(@Args('updateVoteInput') updateVoteInput: UpdateVoteInput) {
    return this.voteService.update(updateVoteInput.id, updateVoteInput);
  }

  @Mutation(() => Vote)
  removeVote(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.remove(id);
  }
}
