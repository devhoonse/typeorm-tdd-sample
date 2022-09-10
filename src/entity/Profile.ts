
import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, OneToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  age?: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @JoinColumn()
  @OneToOne(type => User, user => user.profile, {onDelete: "CASCADE"})
  user: User;

}
