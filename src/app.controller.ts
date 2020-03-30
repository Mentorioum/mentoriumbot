import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationWatcher } from './notification.watcher';

@Controller()
export class AppController implements OnModuleInit{
  constructor(private readonly appService: NotificationService,
              private readonly wather: NotificationWatcher) {}

  async onModuleInit(): Promise<any> {
    // TODO: #53 remove or move workflow management to other place
    // return this.wather.start(process.env.NOTIFICATION_WAKEUP_INTERVAL)
    return Promise.resolve(true);
  }

  @Get('findInvitations')
  async findInvitations(): Promise<Array<object>>  {
    return await this.appService.fetchInvitations();
  }

  @Get('findNotifications')
  async findNotifications(): Promise<Array<object>>  {
    return await this.appService.fetchNotification({
      participating: false
    })
  }

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
