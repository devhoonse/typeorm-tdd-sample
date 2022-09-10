import {IsNull, Like} from "typeorm";

import {Post} from "../entity/Post";
import {User} from "../entity/User";


export class PostModule {

  /**
   * 새 포스트 작성
   */
  public static async write(userId: number, data: Partial<Post>) {
    const user = await User.findOne({ where: { id: userId } });
    const post = new Post();
    post.user = user;
    post.title = data.title;
    post.content = data.content;
    return await post.save();
  }

  /**
   * 기존 포스트 수정
   */
  public static async update(postId: number, userId: number, data: Partial<Post>) {

    // 포스트가 사용자 것인지 확인합니다.
    const post = await Post.findOne({
      where: { id: postId, deletedAt: IsNull() }
    });
    if (post.user.id !== userId) return null;

    // 포스트 내용을 수정하고 저장한 결과를 반환합니다.
    for (const key in data) {
      post[key] = data[key];
    }
    return await post.save();
  }

  /**
   * 포스트 목록
   */
  public static async list(skip: number, take: number, search?: string) {

    // 검색 조건을 파싱합니다. search 로 값을 전달받은 경우에만 수행합니다.
    let where = [];
    if (search) {
      where = [
        { title: Like(`%${search}%`) },
        { content: Like(`%${search}%`) }
      ];
    }

    // 검색 조건에 맞는 포스트 목록을 반환합니다.
    return await Post.find({
      where: {deletedAt: IsNull(), ...where},
      skip,
      take
    });
  }

  /**
   * 특정 사용자가 작성한 포스트 목록
   */
  public static async userPosts(userId: number) {
    return await Post.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      relations: ['user'],
      order: { id: 'DESC' }
    });
  }

  /**
   * 특정 포스트 내용 조회
   */
  public static async get(id: number) {
    return await Post.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['user']
    });
  }

  /**
   * 특정 포스트 삭제
   */
  public static async delete(postId: number, userId: number) {

    // 포스트가 사용자 것인지 확인합니다.
    const post = await Post.findOne({
      where: { id: postId  },
      relations: ['user']
    });
    if (post.user.id !== userId) return null;

    // 포스트 내용을 삭제한 결과를 반환합니다.
    return await post.remove();
  }

}
