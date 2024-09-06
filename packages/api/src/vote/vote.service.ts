import { Injectable } from '@nestjs/common';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {

  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) { }

  create(createVoteInput: CreateVoteInput) {
    const v = new Vote();
    v.voteId = createVoteInput.voteId;
    v.date = createVoteInput.date;
    v.loser = createVoteInput.loser;
    v.comments = createVoteInput.comments;
    v.personalVotes = [];

    return this.voteRepository.save(v);
  }

  findAll() {
    return this.voteRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteInput: UpdateVoteInput) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
