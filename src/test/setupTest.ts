import { DataSource } from 'typeorm';
import {AppDataSource} from "../data-source";

let dataSource: DataSource;

beforeAll(async () => {
  try {
    dataSource = await AppDataSource.initialize();
  } catch (error) {
    console.error('DB connection failed : ', error);
  }
});

afterAll(async () => {
  try {
    await dataSource.destroy();
  } catch (error) {
    console.error('DB disconnection failed : ', error);
  }
});
