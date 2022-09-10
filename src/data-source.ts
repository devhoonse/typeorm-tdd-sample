import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Profile} from "./entity/Profile";
import {Post} from "./entity/Post";
import {Group} from "./entity/Group";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "svc_typeorm-tdd",
    password: "password",
    database: "db_typeorm-tdd",
    dropSchema: true,               // warning: do not use in production mode
    synchronize: true,
    logging: false,
    entities: [User, Profile, Post, Group],
    migrations: [],
    subscribers: [],
})
