import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 👇 Serve thư mục public
  app.useStaticAssets(join(__dirname, '..', 'src/public'));

  await app.listen(3000);
}
bootstrap();
