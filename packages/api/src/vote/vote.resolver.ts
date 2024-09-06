import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private readonly voteService: VoteService) {}

  @Mutation(() => Vote, { description: 'Create a new vote' })
  createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput) : Promise<Vote> {
    return this.voteService.create(createVoteInput);
  }

  @Query(() => [Vote], { name: 'votes' })
  findAll() {
    return this.voteService.findAll();
  }

  @Query(() => Vote, { name: 'vote' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.voteService.findOne(id);
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
