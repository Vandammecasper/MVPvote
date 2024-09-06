import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { VoteModule } from './vote/vote.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mongodb',
        url: `mongodb://localhost:27027/api`,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true, // Careful with this in production
        useNewUrlParser: true,
        useUnifiedTopology: true, // Disable deprecated warnings
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
  }),
  TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
          const mongo = await MongoMemoryServer.create({
            instance: {
              dbName: process.env.DB_NAME,
            },
          })

          const mongoUri = mongo.getUri()
          console.log('🍃 mongoUri', mongoUri)

          return {
            type: 'mongodb',
            url: `${mongoUri}${process.env.DB_NAME}`,
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: process.env.NODE_ENV == 'production' ? false : true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        } else {
          return {
            type: 'mongodb',
            url: `mongodb://localhost:27027/api`, // DOCKER
            entities: [__dirname + '/**/*.entity.{js,ts}'],
            synchronize: true, // Careful with this in production
            useNewUrlParser: true,
            useUnifiedTopology: true, // Disable deprecated warnings
          }
        }
      },
    }),
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
