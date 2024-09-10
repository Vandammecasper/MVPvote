import { Injectable } from '@nestjs/common';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';
import { PersonalVote, Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { CreatePersonalVoteInput } from './dto/create-personal-vote.input';

@Injectable()
export class VoteService {

  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
  ) { }

  async create(createVoteInput: CreateVoteInput) {
    const existingVote = await this.voteRepository.findOne({ where: { voteId: createVoteInput.voteId } });
    
    if (existingVote) {
        throw new Error(`A vote with this vote id already exists`);
    }

    const v = new Vote();
    v.voteId = createVoteInput.voteId;
    v.creatorUid = createVoteInput.creatorUid;
    v.date = createVoteInput.date;
    v.loser = createVoteInput.loser;
    v.comments = createVoteInput.comments;
    v.personalVotes = [];

    return this.voteRepository.save(v);
  }

  async addPersonalVote(personalVoteInput: CreatePersonalVoteInput) {
    //@ts-ignore
    const vote:Vote = await this.voteRepository.findOne({ where: { voteId: personalVoteInput.voteId } });

    if(!vote) {
      throw new Error(`Vote with ID "${personalVoteInput.voteId}" not found`);
    }

    
    const personalVote = new PersonalVote();
    personalVote.mvp = personalVoteInput.mvp;
    if(vote.loser == true){
      personalVote.loser = personalVoteInput.loser;
    }
    if(vote.comments == true){
      personalVote.mvpComment = personalVoteInput.mvpComment;
      personalVote.loserComment = personalVoteInput.loserComment;
    }

    if(!vote.personalVotes){
      vote.personalVotes = [personalVote];
    } else{
      vote.personalVotes.push(personalVote);
    }

    return this.voteRepository.save(vote);
    
  }

  findAll() {
    return this.voteRepository.find();
  }

  async findByCreatorUid(uid: string) {
    const votes = await this.voteRepository.find({ where: { creatorUid: uid } });
    return votes;
  }

  update(id: number, updateVoteInput: UpdateVoteInput) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return this.voteRepository.delete(id);
  }
}
