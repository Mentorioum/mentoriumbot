import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationWatcher } from './NotificationWatcher';

@Controller()
export class AppController {
  constructor(private readonly appService: NotificationService,
              private readonly wather: NotificationWatcher) {}

  @Get('searchAndMarksAsRead')
  async searchAndMarksAsRead(): Promise<object> {
    return await this.appService.searchAndReadyNotificationIfAny();
  }

  @Get('startWatcher')
  async startWatcher(): Promise<any> {
    return await this.wather.start(process.env.NOTIFICATION_WAKEUP_INTERVAL);
  }

  @Get('stopWatcher')
  async stopWatcher(): Promise<any> {
    return await this.wather.stop();
  }
}
