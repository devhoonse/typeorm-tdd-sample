import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";


@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(type => User, user => user.posts, {onDelete: 'CASCADE'})
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: Date, nullable: true, default: null })
  deletedAt: Date | null;

}
