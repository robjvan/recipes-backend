import { UserPlatform } from "src/common/entities/enum/user-platform.enum";

export class UserLoginRecordDto {
  userId: number;
  platform: UserPlatform;
}