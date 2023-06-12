import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => User, (user) => user.rooms)
  users: User[];
  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
