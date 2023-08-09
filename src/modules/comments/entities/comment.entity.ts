import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { Posts } from '@modules/posts/entities/post.entity';
import { User } from '@modules/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', select: true })
  updatedAt: Date;

  @Column({
    type: 'boolean',
    default: false,
    name: 'is_deleted',
    select: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => Posts, (post) => post.comments, { eager: true })
  @JoinColumn({ name: 'post' })
  post: Posts;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  @JoinColumn({ name: 'commenter' })
  commenter: User;
}
