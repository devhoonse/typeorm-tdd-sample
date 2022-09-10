import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinTable, ManyToMany} from "typeorm";

import {User} from "./User";

@Entity()
export class Group extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(type => User, user => user.groups, {onDelete: 'CASCADE'})
  users: Array<User>;
}
