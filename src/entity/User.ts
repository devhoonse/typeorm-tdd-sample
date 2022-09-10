import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    JoinTable,
    OneToOne,
    OneToMany,
    ManyToMany
} from "typeorm"
import {Profile} from "./Profile";
import {Post} from "./Post";
import {Group} from "./Group";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 120 })
    name: string;

    @Column({ type: 'tinyint' })
    age: number;

    @Column({ default: true })
    enabled: boolean;

    @OneToOne(type => Profile, profile => profile.user, {onDelete: "CASCADE", eager: true})
    profile: Profile;

    @OneToMany(type => Post, post => post.user, {cascade: true})
    posts: Array<Post>;

    @ManyToMany(type => Group, group => group.users)
    groups: Array<Group>;

    @CreateDateColumn()
    createdAt; Date;

    @Column({ type: Date, nullable: true, default: null })
    deletedAt: Date | null;

}
