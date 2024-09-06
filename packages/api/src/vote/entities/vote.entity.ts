import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

ObjectType()
export class PersonalVote {
  @Field(() => String, { description: 'Name of the MVP of the match', nullable: false })
  mvp: string;

  @Field(() => String, { description: 'Comment to explain the MVP vote', nullable: true })
  mvpComment: string;

  @Field(() => String, { description: 'Name of the loser of the match', nullable: true })
  loser: string;

  @Field(() => String, { description: 'Comment to explain the loser vote', nullable: true })
  loserComment: string;
}


@ObjectType()
export class Vote {
  @ObjectIdColumn()
  @Field(() => ID, {description: 'The id of the vote', nullable: false})
  id: string;

  @Column()
  @Field(() => Int, {description: 'Id of the vote created by the front-end', nullable: false})
  voteId: number;

  @Column()
  @Field(() => Date, {description: 'Date of the vote', nullable: false})
  date: Date;

  @Column()
  @Field(() => Boolean, {description: 'Whether loser vote is switched on', nullable: false})
  loser: boolean;

  @Column()
  @Field(() => Boolean, {description: 'Whether comments are switched on', nullable: false})
  comments: boolean;

  @Column()
  @Field(() => [PersonalVote], {description: 'List of the personal votes', nullable: false})
  personalVotes: PersonalVote[];
}
