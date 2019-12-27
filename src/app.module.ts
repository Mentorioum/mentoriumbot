import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [NotificationService],
})
export class AppModule {}
