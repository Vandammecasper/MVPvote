import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";


@InputType()
export class CreatePersonalVoteInput {
    @IsString()
    @Field(() => String, { description: 'Name of the MVP of the match' })
    mvp: string;

    @IsString()
    @Field(() => String, { description: 'Comment to explain the MVP vote' })
    mvpComment: string;

    @IsString()
    @Field(() => String, { description: 'Name of the loser of the match' })
    loser: string;

    @IsString()
    @Field(() => String, { description: 'Comment to explain the loser vote' })
    loserComment: string;

}