import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationService } from './notification.service';
import { NotificationWatcher } from './notification.watcher';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [NotificationService, NotificationWatcher],
})
export class AppModule {}
