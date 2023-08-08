import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Entities
import { User } from '@modules/users/entities/user.entity';
import { Post } from '@modules/posts/entities/post.entity';
import { Comment } from '@modules/comments/entities/comment.entity';

// Modules
import { UsersModule } from '@modules/users/users.module';
import { PostsModule } from '@modules/posts/posts.module';
import { CommentsModule } from '@modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Post, Comment],
      synchronize: true, // set to false in production
      logging: true,
      logger: 'simple-console',
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
