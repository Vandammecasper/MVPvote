import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { CreatePersonalVoteInput } from './create-personal-vote.input';

@InputType()
export class CreateVoteInput {
  @IsString()
  @Field(() => String, { description: 'Id of the vote created by the front-end' })
  voteId: string;

  @IsString()
  @Field(() => String, { description: 'Uid of the creator' })
  creatorUid: string;

  @IsDate()
  @Field(() => Date, { description: 'Date of the vote' })
  date: Date;

  @IsBoolean()
  @Field(() => Boolean, { description: 'Whether loser vote is switched on' })
  loser: boolean;

  @IsBoolean()
  @Field(() => Boolean, { description: 'Whether comments are switched on' })
  comments: boolean;
}
