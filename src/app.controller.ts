import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller()
export class AppController {
  constructor(private readonly appService: NotificationService) {}

  @Get()
  async getHello(): Promise<object> {
    return await this.appService.getHello();
  }
}
