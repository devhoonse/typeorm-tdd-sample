import {faker} from "@faker-js/faker/locale/ko";
import {UserModule} from "./UserModule";
import {PostModule} from "./PostModule";
import {GroupModule} from "./GroupModule";
import {User} from "../entity/User";
import {Post} from "../entity/Post";
import {Group} from "../entity/Group";


describe('Group Module Test', function () {

  let users: Array<User> = [];
  let group: Group;

  beforeAll(async () => {
    const name = faker.lorem.word();
    group = await GroupModule.add(name);
  });

  test('그룹 추가', async () => {
    expect(group).toHaveProperty('id');
  });

  test('유저 추가', async () => {

    // 사용자 2명 추가
    for (let i = 0 ; i < 2 ; i++) {
      const email = faker.datatype.uuid() + faker.internet.email();
      const name = faker.name.lastName() + faker.name.firstName();
      const age = faker.datatype.number({min: 1, max: 120});
      const imageUrl = faker.image.imageUrl();
      const password = faker.internet.password();

      const user = await UserModule.register(email, password, name, age, imageUrl);
      expect(user).toHaveProperty('id');
      users.push(user);
    }
    expect(users).toHaveLength(2);

    // 사용자 2명을 그룹에 추가
    for (const user of users) {
      await GroupModule.groupJoin(group.id, user.id);
    }
    const groupUsers = await GroupModule.groupUsers(group.id);
    expect(groupUsers).toHaveLength(2);
  }, 1000000000);

  test('그룹 지우기', async () => {
    group = await GroupModule.remove(group.id);
    expect(group.id).toEqual(undefined);
    for (let user of users) {
      const userUpdated = await UserModule.get(user.id);
      expect(userUpdated.groups).toHaveLength(0);
    }
  });

});
