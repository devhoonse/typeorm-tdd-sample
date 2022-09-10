import {faker} from "@faker-js/faker/locale/ko";
import {UserModule} from "./UserModule";
import {PostModule} from "./PostModule";
import {User} from "../entity/User";
import {Post} from "../entity/Post";


describe('Post Module Test', function () {

  let user: User;
  const POST_COUNT: number = 10;

  test('사용자 추가', async () => {
    const email = faker.datatype.uuid() + faker.internet.email();
    const name = faker.name.lastName() + faker.name.firstName();
    const age = faker.datatype.number({min: 1, max: 120});
    const imageUrl = faker.image.imageUrl();
    const password = faker.internet.password();

    user = await UserModule.register(email, password, name, age, imageUrl);
    expect(user).toHaveProperty('id');
    expect(user.id).not.toEqual(undefined);
  });

  test('포스트 작성', async () => {
    const posts: Array<Post> = [];

    // 포스트를 여러 개 작성합니다.
    for (let i = 0 ; i < POST_COUNT ; i++) {
      const data = {
        title: faker.lorem.sentence(3),
        content: faker.lorem.lines(5)
      };
      const post = await PostModule.write(user.id, data);
      expect(post).toHaveProperty('id');
      posts.push(post);
    }

    // 작성한 각 포스트들이 데이터베이스에도 동일하게 기록되었는지 확인합니다.
    for (let post of posts) {
      expect(post).toEqual(await PostModule.get(post.id));
    }
  });

  test('포스트 목록 조회', async () => {
    const posts = await PostModule.list(0, POST_COUNT);
    expect(posts).toHaveLength(POST_COUNT);
  });

  test('사용자가 작성항 포스트 목록 조회', async () => {
    const posts = await PostModule.userPosts(user.id);
    expect(posts).toHaveLength(POST_COUNT);
  });

  test('사용자 삭제', async () => {
    const userDeleted = await UserModule.delete(user.id);
    expect(userDeleted.id).toEqual(undefined);
    expect(await PostModule.userPosts(user.id)).toHaveLength(0);
  });


});
