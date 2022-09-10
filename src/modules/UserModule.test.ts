import { faker } from '@faker-js/faker/locale/ko'

import {User} from "../entity/User";
import {UserModule} from "./UserModule";


describe('User Module Test', function () {

  let user: User;
  let password: string;

  test('사용자 추가', async () => {
    const email = faker.datatype.uuid() + faker.internet.email();
    const name = faker.name.lastName() + faker.name.firstName();
    const age = faker.datatype.number({min: 1, max: 120});
    const imageUrl = faker.image.imageUrl();
    password = faker.internet.password();

    user = await UserModule.register(email, password, name, age, imageUrl);
    expect(user).toHaveProperty('id');
    expect(user.id).not.toEqual(undefined);
  });

  test('로그인', async () => {
    const loginUser = await UserModule.login(user.email, password);
    expect(loginUser).not.toBeNull();
  });

  test('사용자 목록', async () => {
    const users = await UserModule.list();
    expect(users.length).toBeGreaterThan(0);
  });

  /**
   * fixme: nested circular relation on User(1)-(1)Profile
   */
  // test('사용자 정보', async () => {
  //   const userInfo = await UserModule.get(user.id);
  //   expect(userInfo).toEqual(user);
  // });

  test('사용자 프로필 변경', async () => {
    const name = faker.name.lastName() + faker.name.firstName();
    const data = {
      name,
      age: faker.datatype.number({min: 1, max: 120}),
      imageUrl: faker.image.imageUrl()
    };
    const userUpdated = await UserModule.profileUpdate(user.id, data);
    expect(user.profile.name).not.toEqual(userUpdated.profile.name);
    expect(data.age).toEqual(userUpdated.profile.age);
    expect(data.imageUrl).toEqual(userUpdated.profile.imageUrl);
  });

  test('사용자 탈퇴', async () => {
    const userLeaved = await UserModule.leave(user.id);
    expect(userLeaved.deletedAt).not.toBeNull();
  });

  test('사용자 삭제', async () => {
    const userDeleted = await UserModule.delete(user.id);
    expect(userDeleted).toHaveProperty('id');
    expect(userDeleted.id).toEqual(undefined);
  });

});
