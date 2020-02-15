import { Injectable } from '@nestjs/common';
import { NotificationService } from './notification.service';
import Timeout = NodeJS.Timeout;

@Injectable()
export class NotificationWatcher {
  private notificationService: NotificationService;
  private timeout: Timeout | undefined;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;

    this.doActions = this.doActions.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  async start(interval) {
    if (this.timeout){
      throw new Error('Already watching');
    }

    console.log('Starting Watcher');
    this.timeout = setInterval(this.doActions, interval);
    console.log('Watcher started');

    return 'done';
  }

  private async doActions () {
    console.log('Start reading notifications');
    await this.notificationService.searchAndReadyNotificationIfAny();
    console.log('Finish reading notifications');
  }

  async stop () {
    if (!this.timeout){
      throw new Error('Nothing to stop watching');
    }

    console.log('Stopping watcher');
    clearInterval(this.timeout);
    this.timeout = undefined;
    console.log('Watcher stopped');

    return 'done';
  }


}
