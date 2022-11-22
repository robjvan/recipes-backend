import { UserPlatform } from "src/common/entities/enums/user-platform.enum";

export class UserLoginRecordDto {
  userId: number;
  platform: UserPlatform;
}