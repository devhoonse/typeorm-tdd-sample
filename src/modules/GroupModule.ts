import {Group} from "../entity/Group";
import {User} from '../entity/User';

export class GroupModule {

  /**
   * 새 그룹 추가
   */
  public static async add(name: string) {
    const group = new Group();
    group.name = name;
    return await group.save();
  }

  /**
   * 그룹에 사용자 추가
   */
  public static async groupJoin(groupId: number, userId: number) {
    const group = await Group.findOne({ where: { id: groupId } });
    const user = await User.findOne({ where: { id: userId }, relations: ["groups"] });
    user.groups.push(group);
    return await user.save();
  }

  /**
   * 사용자가 가입한 그룸 목록 조회
   */
  public static async userGroups(userId: number) {
    const user = await User.findOne({ where: { id: userId } });
    return user.groups;
  }

  /**
   * 그룹에 가입한 사용자 목록 조회
   */
  public static async groupUsers(groupId: number) {
    const group = await Group.findOne({ where: { id: groupId }, relations: ["users"] });
    return group.users;
  }

  /**
   * 그룹 삭제
   */
  public static async remove(groupId: number) {
    const group = await Group.findOne({ where: { id: groupId } });
    return await group.remove();
  }

}
