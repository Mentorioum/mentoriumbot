import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  /**
   * @todo #1:30m/DEV Get List of notification from Github
   *  use graphql to request for notifications
   *  rename to notification service
   */
  getHello(): string {
    return 'Hello World!';
  }
}
