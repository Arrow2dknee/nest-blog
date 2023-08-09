import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Posts } from '@modules/posts/entities/post.entity';
import { Comment } from '@modules/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 25 })
  username: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 255 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 60, select: false }) // this field will not get projected in find queries
  password: string;

  @OneToMany(() => Posts, (post) => post.author, { cascade: true })
  posts: Posts[];

  @OneToMany(() => Comment, (comment) => comment.commenter, { cascade: true })
  comments: Comment[];
}
