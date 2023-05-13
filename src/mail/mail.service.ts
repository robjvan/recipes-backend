import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /**
   * Sends a test email message to the given user.
   *
   * @param user Newly created User object to be confirmed
   * @param token Email token to send to user
   * @returns SentMessageInfo object
   * @throws InternalServerErrorException if message couldn't be sent
   *
   * Example:
   * ```ts
   * const result: SendMessageInfo = await mailService.sendUserConfirmation(user, token);
   * ```
   */
  async sendUserConfirmation(
    user: User,
    token: string,
  ): Promise<SentMessageInfo> {
    // const url = `localhost:5000/auth/confirm/${token}`;
    let result: SentMessageInfo;

    try {
      result = await this.mailerService.sendMail({
        to: user.username,
        subject: 'Welcome to Recipes!  Confirm your email',
        template: './confirm-email',
        context: {
          name: user.name,
          token: token,
        },
      });
    } catch {
      throw new InternalServerErrorException();
    }

    return result;
  }

  /**
   * Sends a test email message to the given user.
   *
   * @returns SentMessageInfo object
   * @throws InternalServerErrorException if message couldn't be sent
   *
   * Example:
   * ```ts
   * const result: SendMessageInfo = await mailService.sendTestMsg();
   * ```
   */
  async sendTestMsg(): Promise<SentMessageInfo> {
    let result: SentMessageInfo;

    try {
      result = await this.mailerService.sendMail({
        to: 'robjvan@gmail.com',
        subject: 'Welcome to Recipes!  Confirm your email',
        template: './confirm-email',
        context: {
          name: 'Dad',
          token: 'qwertyuiopasdfghjklzxcvbnm',
        },
      });
    } catch {
      throw new InternalServerErrorException('Could not send test message');
    }
    return result;
  }
}
