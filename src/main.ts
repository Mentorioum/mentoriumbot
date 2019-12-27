import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * @todo #1:30m/DEV Provide env configuration
   *  move PORT to env variablese
   *  use dotenv-safe approach
   */
  await app.listen(3000);
}
bootstrap();
