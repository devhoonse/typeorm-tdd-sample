import * as bcrypt from 'bcrypt';
import {IsNull} from "typeorm";

import {Profile} from "../entity/Profile";
import {User} from "../entity/User";


export class UserModule {

  /**
   * 회원 가입
   */
  public static async register(email: string, password: string, name: string, age: number, imageUrl: string) {

    const profile = new Profile();
    profile.name = name;
    profile.age = age;
    profile.imageUrl = imageUrl;
    await profile.save();

    const user = new User();
    user.password = await bcrypt.hash(password, 10);
    user.email = email;
    user.name = name;
    user.age = age;
    user.profile = profile;
    await user.save();

    profile.user = user;
    await profile.save();

    return await user.save();
  }

  /**
   * 로그인
   */
  public static async login(email: string, password: string) {

    // 존재하는 사용자인지 확인
    const user = await User.findOne({
      where: { email, deletedAt: IsNull() }
    });
    if (!user) return null;

    // 존재하는 사용자이면 패스워드 확인
    if (! await bcrypt.compare(password, user.password)) return null;

    // 존재하는 사용자이고 패스워드도 확인 됬으면 사용자 정보 반환
    return user;
  }

  /**
   * 사용자 목록
   */
  public static async list() {
    return await User.find({
      where: { deletedAt: IsNull() },
      relations: ['profile'],
      order: { id: 'DESC' }
    });
  }

  /**
   * 사용자 정보 조회
   */
  public static async get(id: number) {
    return await User.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ["groups"]
    });
  }

  /**
   * 사용자 프로필 변경
   */
  public static async profileUpdate(id: number, data: Partial<Profile>) {
    const user = await User.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['profile']
    });
    for (const key in data) {
      user.profile[key] = data[key];
    }
    user.profile = await user.profile.save();
    return user;
  }

  /**
   * 사용자 탈퇴
   */
  public static async leave(id: number) {
    const user = await User.findOne({
      where: { id }
    });
    user.deletedAt = new Date();
    return await user.save();
  }

  /**
   * 사용자 삭제
   */
  public static async delete(id: number) {
    const user = await User.findOne({
      where: { id },
      relations: ['profile']
    });
    return await user.remove();
  }

}
