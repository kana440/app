import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // APIのURIをすべて/apiから始まるようにする
  app.setGlobalPrefix('api');

  // CORS対応
  app.enableCors();

  // Swagger拡張の有効化
  const options = new DocumentBuilder()
    .setTitle('API description')
    .setVersion('1.0')
    .addServer('/')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  // PORT番号を初期値の3000からdocker-compose.ymlで記述していた環境変数に変更
  await app.listen(process.env.BACKEND_INNER_PORT);
}
bootstrap();